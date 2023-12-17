"use client";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginInProcess, setLoginInProcess] = useState(false);
  const [loginError, setError] = useState("");

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoginInProcess(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginInProcess(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      {loginError && (
        <>
          <div className="text-center text-red-500">Error loging in.</div>
          <div className="text-center text-red-500 font-bold">{loginError}</div>
        </>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          className=""
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          disabled={loginInProcess}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className=""
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          disabled={loginInProcess}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          className="w-full  p-2  mt-4"
          type="login"
          disabled={loginInProcess}
        >
          Login
        </button>
        <div className="my-4 text-center text-gray-400">
          or login with provider
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
          type="button"
          disabled={loginInProcess}
        >
          <Image src="/google.png" width={24} height={24} alt="google" />
          Login with google
        </button>
      </form>
    </section>
  );
}
