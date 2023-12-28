"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Header() {
  const session = useSession();
  console.log(session);
  const status = session?.status;
  const userData = session?.data?.user;
  let userName = userData?.name || userData?.email;

  if (userName?.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  if (userName?.includes("@")) {
    userName = userName.split("@")[0];
  }
  return (
    <>
      <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href="/">
            ST PIZZA
          </Link>
          <Link href="/home">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav className="flex items-center gap-8">
          {status === "authenticated" && (
            <>
              <Link href="/profile" className="whitespace-nowrap">
                Hello, {userName}
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Logout
              </button>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <Link href="/login" className="">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-primary text-white px-8 py-2 rounded-full"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
