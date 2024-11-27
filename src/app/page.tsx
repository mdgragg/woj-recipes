import AddRecipeForm from "../components/AddRecipeForm";
import RecipeList from "../components//RecipeList";
import { getRecipes } from "../lib/recipes";

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Recipe Book <span className="text-sm font-bold ">V2</span>
      </h1>

      <AddRecipeForm />
      <RecipeList initialRecipes={recipes} />
    </div>
  );
}
