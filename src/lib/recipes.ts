import { db } from "./firebaseClient";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  ingredients: string[];
  directions: string;
  tags: string[];
};

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function getRecipes(): Promise<Recipe[]> {
  const recipesCol = collection(db, "recipes");
  const recipeSnapshot = await getDocs(recipesCol);
  return recipeSnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Recipe)
  );
}

export async function addRecipe(
  recipe: Omit<Recipe, "id" | "slug">
): Promise<Recipe> {
  const slug = slugify(recipe.title);
  const normalizedTags = recipe.tags.map((tag) => tag.toLowerCase().trim());
  const newRecipe = { ...recipe, slug, tags: normalizedTags };
  const docRef = await addDoc(collection(db, "recipes"), newRecipe);
  return { id: docRef.id, ...newRecipe };
}

export async function updateRecipe(
  id: string,
  updatedRecipe: Omit<Recipe, "id" | "slug">
): Promise<Recipe | null> {
  const recipeRef = doc(db, "recipes", id);
  const normalizedTags = updatedRecipe.tags.map((tag) =>
    tag.toLowerCase().trim()
  );
  const recipeToUpdate = { ...updatedRecipe, tags: normalizedTags };
  await updateDoc(recipeRef, recipeToUpdate);
  return { id, ...recipeToUpdate, slug: slugify(updatedRecipe.title) };
}

export async function deleteRecipe(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "recipes", id));
    return true;
  } catch (error) {
    console.error(`Error deleting recipe: ${id}`, error);
    return false;
  }
}

export async function getRecipe(slug: string): Promise<Recipe | undefined> {
  const recipesCol = collection(db, "recipes");
  const q = query(recipesCol, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return undefined;
  }
  const doc = querySnapshot.docs[0];
  return { id: doc.id, ...doc.data() } as Recipe;
}
