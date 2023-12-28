"use client";

import { useSession, reloadSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function ProfilePage() {
  const savedBannerTimeCount = 3000;

  const session = useSession();
  const { status } = session;

  const [userName, setUserName] = useState("jon");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [image, setImage] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

  /* use effect section */
  useEffect(() => {
    setUserName(session?.data?.user?.name);
    setImage(session?.data?.user?.image);
  }, [session, status]);

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
        body: JSON.stringify({ name: userName, image }),
      });
      if (response.status === 200) {
        setSaved(true);
        setIsSaving(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleFileChange(e) {
    try {
      setIsImageUploading(true);
      const file = e?.target?.files?.[0];
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("/api/profile/image", {
        method: "PUT",
        body: formData,
      });
      if (response.status !== 200) {
        return;
      }
      const { linkToImage } = await response.json();
      console.log(linkToImage);
      setImage(linkToImage);
      setIsImageUploading(false);
      reloadSession();
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
        {isImageUploading && (
          <h2 className="text-center border-blue-300 border-2 rounded-lg text-blue-700 bg-blue-200 text-2xl mb-4">
            Uploading ...
          </h2>
        )}
        <CSSTransition in={saved} timeout={500} classNames="fade" unmountOnExit>
          <h2 className="text-center border-green-300 border-2 rounded-lg text-green-700 bg-green-200 text-2xl mb-4">
            Profile saved!
          </h2>
        </CSSTransition>
        <div className="flex gap-2 items-center">
          <div>
            <div className="bg-gray-100 p-4 rounded-lg relative max-w-[120px]">
              <Image
                className="rounded-lg w-full h-full mb-1"
                src={image || "/google.png"}
                alt="user image"
                width="250"
                height="250"
              />

              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="block border-gray-400 border rounded-lg p-2 text-center cursor-pointer">
                  Edit
                </span>
              </label>
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
