"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";

export default function ProfilePage() {
  const session = useSession();
  const { status } = session;

  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfileFetching, setIsProfileFetching] = useState(false);

  /* use effect section */
  useEffect(() => {
    setUserName(session?.data?.user?.name);
    setImage(session?.data?.user?.image);
    setIsProfileFetching(true);
    fetch("/api/profile", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPhone(data?.phone);
        setStreetAddress(data?.streetAddress);
        setPostalCode(data?.postalCode);
        setCity(data?.city);
        setCountry(data?.country);
        setIsAdmin(data?.admin);
        setIsProfileFetching(false);
      });
  }, [session, status]);

  /* end of use effect section */

  if (status === "loading" || isProfileFetching) {
    return (
      <h1 className="text-center text-primary text-4xl mt-10">Loading ...</h1>
    );
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }

  async function handleProfileInfoUpdate(e) {
    e.preventDefault();
    try {
      const savingPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userName,
            image,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
          }),
        });
        if (response.status === 200) {
          resolve();
        } else {
          reject();
        }
      });
      await toast.promise(savingPromise, {
        loading: "Saving...",
        success: "Saved!",
        error: "Error saving profile",
      });
    } catch (error) {
      toast.error("Error saving profile");
      console.error(error);
    }
  }

  async function handleFileChange(e) {
    try {
      const file = e?.target?.files?.[0];
      const formData = new FormData();
      formData.append("image", file);

      const savingImagePromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/profile/image", {
          method: "PUT",
          body: formData,
        });
        if (response.status === 200) {
          const { linkToImage } = await response.json();
          // console.log(linkToImage);
          setImage(linkToImage);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(savingImagePromise, {
        loading: "Uploading image...",
        success: "Image uploaded!",
        error: "Error uploading image",
      });
    } catch (error) {
      toast.error("Error uploading image");
      console.error(error);
    }
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-md mx-auto mt-8">
        <div className="flex gap-2">
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
            <label>First and last name</label>
            <input
              type="text"
              placeholder="First and last name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label>Email</label>
            <input
              className=""
              type="email"
              disabled={true}
              value={session?.data?.user?.email || ""}
            />
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            />
            <label>Street Address</label>
            <input
              type="text"
              placeholder="Street Address"
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            />
            <div className="flex gap-2">
              <div className="flex-grow">
                <label>Postal Code</label>
                <input
                  type="text"
                  placeholder="postal code"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </div>
              <div className="flex-grow">
                <label>City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
              </div>
            </div>
            <label>Country</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            />
            <button type="Submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
