"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Recipe } from "../lib/recipes";

function RecipeListContent({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tags = searchParams.getAll("tags");
    setSelectedTags(tags);
  }, [searchParams]);

  useEffect(() => {
    const filteredRecipes =
      selectedTags.length > 0
        ? initialRecipes.filter((recipe) =>
            recipe.tags.some((tag) =>
              selectedTags
                .map((t) => t.toLowerCase())
                .includes(tag.toLowerCase())
            )
          )
        : initialRecipes;
    setRecipes(filteredRecipes);
  }, [selectedTags, initialRecipes]);

  const allTags = Array.from(
    new Set(initialRecipes.flatMap((recipe) => recipe.tags))
  );

  const toggleTag = (tag: string) => {
    const lowercaseTag = tag.toLowerCase();
    const newTags = selectedTags
      .map((t) => t.toLowerCase())
      .includes(lowercaseTag)
      ? selectedTags.filter((t) => t.toLowerCase() !== lowercaseTag)
      : [...selectedTags, tag];

    const params = new URLSearchParams();
    newTags.forEach((t) => params.append("tags", t));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => toggleTag("All")}
          className={`px-3 py-1 rounded-full text-sm ${
            selectedTags.length === 0
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedTags
                .map((t) => t.toLowerCase())
                .includes(tag.toLowerCase())
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <ul className="space-y-2">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.title} className="py-2">
              <Link
                href={`/recipes/${encodeURIComponent(
                  recipe.title.toLowerCase().replace(/ /g, "-")
                )}`}
                className="text-blue-600 hover:underline"
              >
                {recipe.title}
              </Link>
            </li>
          ))
        ) : (
          <li>No recipes found for the selected tags.</li>
        )}
      </ul>
    </div>
  );
}

export default function RecipeList({
  initialRecipes,
}: {
  initialRecipes: Recipe[];
}) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RecipeListContent initialRecipes={initialRecipes} />
    </Suspense>
  );
}
