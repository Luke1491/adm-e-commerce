"use client";

import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);

  async function handleFormSubmit(event) {
    event.preventDefault();
    setCreatingUser(true);
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
      });
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
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
        <button className="flex gap-4 justify-center">
          <Image src="/google.png" width={24} height={24} alt="google" />
          Login with google
        </button>
      </form>
    </section>
  );
}
