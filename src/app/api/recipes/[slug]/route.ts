// src/app/api/recipes/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRecipe, updateRecipe, deleteRecipe } from "../../../../lib/recipes";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").pop(); // Extract slug from URL path
  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const recipe = await getRecipe(slug);
    if (recipe) {
      return NextResponse.json(recipe);
    } else {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").pop(); // Extract slug from URL path
  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const body = await request.json();
    const existingRecipe = await getRecipe(slug);
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    const updatedRecipe = await updateRecipe(existingRecipe.id, body);
    if (updatedRecipe) {
      return NextResponse.json(updatedRecipe);
    } else {
      return NextResponse.json(
        { error: "Failed to update recipe" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/").pop(); // Extract slug from URL path
  try {
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    const existingRecipe = await getRecipe(slug);
    if (!existingRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }
    const success = await deleteRecipe(existingRecipe.id);
    if (success) {
      return NextResponse.json({ message: "Recipe deleted successfully" });
    } else {
      return NextResponse.json(
        { error: "Failed to delete recipe" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
