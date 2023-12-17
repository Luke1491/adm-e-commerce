"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response)
        .then((data) => {
          console.log(data);
          if (data.status !== 200) setError(data.statusText);
        });
      setCreatingUser(false);
      setCreatedUser(true);
    } catch (error) {
      console.log(error);
      setCreatingUser(false);
      setError(error);
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      {createdUser && !error && (
        <div className="text-center text-green-500">
          User created successfully. <br /> Now you can
          <Link
            className="text-blue-500
          "
            href="/login"
          >
            &nbsp;Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="text-center text-red-500">
          Error creating user. <br /> {error}
        </div>
      )}
      {createdUser || (
        <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
          <input
            className=""
            type="email"
            placeholder="Email"
            value={email}
            disabled={creatingUser}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            className=""
            type="password"
            placeholder="Password"
            value={password}
            disabled={creatingUser}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="" type="submit" disabled={creatingUser}>
            Register
          </button>
          <div className="my-4 text-center text-gray-400">
            {" "}
            or login with provider
          </div>
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex gap-4 justify-center"
          >
            <Image src="/google.png" width={24} height={24} alt="google" />
            Login with google
          </button>
          <div className="my-4 text-center text-gray-400">
            Existing account?{" "}
            <Link className="text-blue-500 underline" href="/login">
              Login here &raquo;
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}
