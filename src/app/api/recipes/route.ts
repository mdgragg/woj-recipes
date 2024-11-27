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
  console.log("API Route: Received POST request");

  try {
    const body = await request.json();
    console.log("API Route: Received body", body);

    const newRecipe = await addRecipe(body);
    console.log("API Route: Recipe added successfully", newRecipe);

    return new NextResponse(JSON.stringify(newRecipe), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    console.error("API Route: Error occurred", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return new NextResponse(
      JSON.stringify({
        error: errorMessage,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
