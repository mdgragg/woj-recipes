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

// Utility to create slugs from titles
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Utility to normalize tags
function normalizeTags(tags: string[]): string[] {
  return tags.map((tag) => tag.toLowerCase().trim());
}

// Fetch all recipes from Firestore
export async function getRecipes(): Promise<Recipe[]> {
  const recipesCol = collection(db, "recipes");
  const recipeSnapshot = await getDocs(recipesCol);
  return recipeSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Recipe)
  );
}

// Add a new recipe to Firestore
export async function addRecipe(
  recipe: Omit<Recipe, "id" | "slug">
): Promise<Recipe> {
  const slug = slugify(recipe.title);
  const normalizedTags = normalizeTags(recipe.tags);
  const newRecipe = { ...recipe, slug, tags: normalizedTags };
  const docRef = await addDoc(collection(db, "recipes"), newRecipe);
  return { id: docRef.id, ...newRecipe };
}

// Update an existing recipe in Firestore
export async function updateRecipe(
  id: string,
  updatedRecipe: Omit<Recipe, "id" | "slug">
): Promise<Recipe | null> {
  const recipeRef = doc(db, "recipes", id);
  const normalizedTags = normalizeTags(updatedRecipe.tags);
  const recipeToUpdate = { ...updatedRecipe, tags: normalizedTags };
  await updateDoc(recipeRef, recipeToUpdate);
  return { id, ...recipeToUpdate, slug: slugify(updatedRecipe.title) };
}

// Delete a recipe from Firestore
export async function deleteRecipe(id: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, "recipes", id));
    return true;
  } catch (error) {
    console.error(`Error deleting recipe: ${id}`, error);
    return false;
  }
}

// Fetch a single recipe by slug from Firestore
export async function getRecipe(slug: string): Promise<Recipe | null> {
  const recipesCol = collection(db, "recipes");
  const q = query(recipesCol, where("slug", "==", slug));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const doc = querySnapshot.docs[0];
  const data = doc.data();

  // Explicitly ensure all required fields exist
  return {
    id: doc.id,
    slug: data.slug || "",
    title: data.title || "",
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    directions: data.directions || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
  } as Recipe;
}
