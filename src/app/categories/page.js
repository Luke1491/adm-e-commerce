"use client";

import UserTabs from "../../components/layout/UserTabs";
import { useProfile } from "../../components/UseProfile";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [newCategoryName, setNewCategoryName] = useState("");

  if (profileLoading) {
    return (
      <h1 className="text-center text-primary text-4xl mt-10">Loading ...</h1>
    );
  }
  if (!profileData?.admin) {
    return (
      <h1 className="text-center text-primary text-4xl mt-10">
        You are not authorized to view this page
      </h1>
    );
  }

  async function handleNewCategorySubmit(e) {
    e.preventDefault();
    try {
      const creationPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/categories", {
          method: "POST",
          body: JSON.stringify({
            name: newCategoryName,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(creationPromise, {
        loading: "Creating category",
        success: "Category created",
        error: "Error creating category",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={profileData?.admin} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label> New Category name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="pb-2">
            <button
              type="submit"
              className="bg-primary text-white px-8 rounded-full"
            >
              Add Category
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
