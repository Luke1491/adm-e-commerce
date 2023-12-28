"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const savedBannerTimeCount = 3000;

  const session = useSession();
  const { status } = session;
  const userImage = session?.data?.user?.image;

  const [userName, setUserName] = useState("jon");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /* use effect section */
  //set userName to user.name when user.name changes
  useEffect(() => {
    setUserName(session?.data?.user?.name);
  }, [session?.data?.user?.name]);

  //set saved to false after 3 seconds
  useEffect(() => {
    if (saved) {
      const timeout = setTimeout(() => {
        setSaved(false);
      }, savedBannerTimeCount);
      return () => clearTimeout(timeout);
    }
  }, [saved]);

  /* end of use effect section */

  if (status === "loading") {
    return (
      <h1 className="text-center text-primary text-4xl mt-10">Loading ...</h1>
    );
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    setSaved(false);
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      });
      if (response.status === 200) {
        setSaved(true);
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <div className="max-w-md mx-auto">
        {isSaving && (
          <h2 className="text-center border-blue-300 border-2 rounded-lg text-blue-700 bg-blue-200 text-2xl mb-4">
            Saving ...
          </h2>
        )}
        {saved && (
          <h2 className="text-center border-green-300 border-2 rounded-lg text-green-700 bg-green-200 text-2xl mb-4">
            Profile saved!
          </h2>
        )}
        <div className="flex gap-2 items-center">
          <div>
            <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={userImage}
                alt="user image"
                width="250"
                height="250"
              />
              <button
                type="button"
                className="border border-gray-400 rounded-lg"
              >
                Edit
              </button>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className=""
              type="email"
              disabled={true}
              value={session?.data?.user?.email || ""}
            />
            <button type="Submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
