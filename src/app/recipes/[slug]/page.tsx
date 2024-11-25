"use client"; // This directive tells Next.js that this file uses client-side features

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import EditRecipeForm from "../../../components/EditRecipeForm";
import DeleteRecipeButton from "../../../components/DeleteRecipeButton";
import { Recipe, getRecipe } from "../../../lib/recipes";

const RecipePage = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof slug === "string") {
      const fetchRecipe = async () => {
        const fetchedRecipe = await getRecipe(slug);
        setRecipe(fetchedRecipe || null); // Set to null if fetchedRecipe is undefined
        setLoading(false);
      };

      fetchRecipe();
    } else {
      setLoading(false); // Set loading to false if slug is not properly defined
    }
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recipe) {
    return <div>Recipe not found. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Recipes
      </Link>
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <div className="mb-4">
        <span className="font-semibold">Tags:</span>
        {recipe.tags.length > 0 ? recipe.tags.join(", ") : "No tags"}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index} className="mb-1">
              {ingredient}
            </li>
          ))}
        </ul>
        <h2 className="text-xl font-semibold mb-2">Directions:</h2>
        <p className="whitespace-pre-wrap">{recipe.directions}</p>
      </div>
      <div className="flex space-x-4">
        <EditRecipeForm recipe={recipe} slug={recipe.slug} />
        <DeleteRecipeButton slug={recipe.slug} />
      </div>
    </div>
  );
};

export default RecipePage;
