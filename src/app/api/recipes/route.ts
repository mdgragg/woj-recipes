import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function GET() {
  try {
    const recipesCol = collection(db, "recipes");
    const recipesSnapshot = await getDocs(recipesCol);
    const recipes = recipesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const docRef = await addDoc(collection(db, "recipes"), body);
    const newRecipe = { id: docRef.id, ...body };
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}
