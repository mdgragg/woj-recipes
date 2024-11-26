// import React from "react";
// import Link from "next/link";
// import { getRecipe, getRecipes } from "@/lib/recipes";
// import EditRecipeForm from "@/components/EditRecipeForm";
// import DeleteRecipeButton from "@/components/DeleteRecipeButton";

// // Generate static parameters for dynamic routes
// export async function generateStaticParams() {
//   const recipes = await getRecipes();
//   console.log(await generateStaticParams());

//   return recipes.map((recipe) => ({ slug: recipe.slug }));
// }

// // Define the type for params
// type PageProps = {
//   params: {
//     slug: string;
//   };
// };

// // Dynamic recipe page
// const RecipePage = async ({ params }: PageProps) => {
//   const recipe = await getRecipe(params.slug);

//   if (!recipe) {
//     return <div>Recipe not found. Please try again later.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <Link
//         href="/"
//         className="text-blue-500 hover:underline mb-4 inline-block"
//       >
//         &larr; Back to Recipes
//       </Link>
//       <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
//       <div className="mb-4">
//         <span className="font-semibold">Tags:</span>{" "}
//         {recipe.tags.length > 0 ? recipe.tags.join(", ") : "No tags"}
//       </div>
//       <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//         <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
//         <ul className="list-disc list-inside mb-4">
//           {recipe.ingredients.map((ingredient, index) => (
//             <li key={index} className="mb-1">
//               {ingredient}
//             </li>
//           ))}
//         </ul>
//         <h2 className="text-xl font-semibold mb-2">Directions:</h2>
//         <p className="whitespace-pre-wrap">{recipe.directions}</p>
//       </div>
//       <div className="flex space-x-4">
//         <EditRecipeForm recipe={recipe} slug={recipe.slug} />
//         <DeleteRecipeButton slug={recipe.slug} />
//       </div>
//     </div>
//   );
// };

// export default RecipePage;
// src/app/recipes/[slug]/page.tsx
import React from "react";
import { getRecipe } from "@/lib/recipes";
import Link from "next/link";
import EditRecipeForm from "@/components/EditRecipeForm";
import DeleteRecipeButton from "@/components/DeleteRecipeButton";

// Optional: Force dynamic rendering (useful for debugging)
export const dynamic = "force-dynamic";

// Dynamic recipe page
export default async function RecipePage({ params }: any) {
  console.log("Params Debug:", params); // Debugging

  // Extract slug from params
  const slug = params.slug;

  // Fetch the recipe
  const recipe = await getRecipe(slug);

  // Handle missing recipe
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
        <span className="font-semibold">Tags:</span>{" "}
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
}
