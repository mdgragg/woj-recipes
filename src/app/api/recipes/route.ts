import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/firebaseClient";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { addRecipe, getRecipes } from "@/lib/recipes";

export async function GET() {
  try {
    const recipes = await getRecipes(); // Fetch all recipes
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
    const newRecipe = await addRecipe(body); // Use `addRecipe` from `recipes.ts`
    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error("Error adding recipe:", error);
    return NextResponse.json(
      { error: "Failed to add recipe" },
      { status: 500 }
    );
  }
}
