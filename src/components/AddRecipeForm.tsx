"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddRecipeForm() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [directions, setDirections] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const filteredTags = tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag !== "");

      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          ingredients: ingredients
            .split("\n")
            .filter((ingredient) => ingredient.trim() !== ""),
          directions,
          tags: filteredTags,
        }),
      });

      const text = await response.text(); // Get the raw response text for debugging

      // Debugging response
      console.log("Raw Response:", text);

      if (response.ok) {
        const data = JSON.parse(text); // Parse the JSON if the response is OK
        console.log("Parsed Response:", data);

        setTitle("");
        setIngredients("");
        setDirections("");
        setTags("");
        router.push(`/recipes/${data.slug}`);
      } else {
        let errorMessage = "Failed to add recipe. Please try again.";
        try {
          const errorData = JSON.parse(text);
          errorMessage = errorData.error || errorMessage;
          console.error("API Error Response:", errorData);
        } catch (parseError) {
          console.error("Error parsing error response:", parseError);
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
      setError(
        "An unexpected error occurred while adding the recipe. Please try again."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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
      <div>
        <label htmlFor="tags" className="block mb-1">
          Tags (comma separated):
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g. vegetarian, quick, dessert"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Recipe
      </button>
    </form>
  );
}
