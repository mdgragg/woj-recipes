"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "../lib/recipes";

export default function EditRecipeForm({
  recipe,
  slug,
}: {
  recipe: Recipe;
  slug: string;
}) {
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join("\n"));
  const [directions, setDirections] = useState(recipe.directions);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`/api/recipes/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          ingredients: ingredients.split("\n"),
          directions,
        }),
      });
      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(
          errorData.error || "Failed to update recipe. Please try again."
        );
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      setError("An error occurred. Please try again.");
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit Recipe
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <h2 className="text-2xl font-bold">Edit Recipe</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="title" className="block mb-1">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="ingredients" className="block mb-1">
          Ingredients (one per line):
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <div>
        <label htmlFor="directions" className="block mb-1">
          Directions:
        </label>
        <textarea
          id="directions"
          value={directions}
          onChange={(e) => setDirections(e.target.value)}
          required
          className="w-full p-2 border rounded"
          rows={5}
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Recipe
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
