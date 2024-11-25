"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteRecipeButton({ slug }: { slug: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/recipes/${slug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          router.push("/");
          router.refresh();
        } else {
          alert("Failed to delete recipe. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting recipe:", error);
        alert("An error occurred. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete Recipe"}
    </button>
  );
}
