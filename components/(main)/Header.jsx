"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkMode";
// import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { v4 as uuidv4 } from "uuid";

function Header() {
  const menuOptions = [{ name: "Home", path: "/" }];
  // const { user } = useUser();
  const path = usePathname();

  const [user, setUser] = useState(null);
  useEffect(() => {
    let id = localStorage.getItem("user_uuidv4");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("user_uuidv4", id);
    }
    setUser(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md transition-colors duration-300 dark:text-amber-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 gap-4 flex-wrap md:flex-nowrap">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="/logo.svg"
              alt="logo"
              width={36}
              height={36}
              className="dark:invert "
            />
            <h1 className="font-extrabold text-2xl sm:text-3xl text-gray-900 dark:text-amber-100">
              Tripzy-Ai
            </h1>
          </div>
        </Link>

        {/* Desktop Items */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <nav className="flex items-center gap-6">
            {menuOptions.map((menu, index) => (
              <Link key={index} href={menu.path}>
                <span className="text-lg sm:text-xl text-gray-800 dark:text-amber-100 hover:text-primary hover:scale-105 transition-all cursor-pointer dark:hover:text-amber-300 font-bold">
                  {menu.name}
                </span>
              </Link>
            ))}
          </nav>

          <ModeToggle />

          {/* {!user ? (
            <SignInButton mode="modal">
              <Button className="whitespace-nowrap">Get Started</Button>
            </SignInButton>
          ) : path === "/my" ? (
            <Link href="/create">
              <Button className="whitespace-nowrap cursor-pointer dark:bg-amber-900 dark:text-white dark:hover:bg-amber-800">
                Create Trip
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <UserButton />
              <Link href="/my">
                <Button className="whitespace-nowrap cursor-pointer">
                  My Trips
                </Button>
              </Link>
            </div>
          )} */}

          {/* //without user authenctoin */}
          {!user ? (
            <Button className="whitespace-nowrap" disabled>
              Loading...
            </Button>
          ) : path === "/trips/my" ? (
            <Link href="/trips/create">
              <Button className="whitespace-nowrap cursor-pointer dark:bg-amber-900 dark:text-white dark:hover:bg-amber-800">
                Create Trip
              </Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3 ">
              <span
                title="Click to copy"
                onClick={() => {
                  navigator.clipboard.writeText(user);
                  alert(`ID copied : ${user}`);
                }}
                className={`text-sm text-white font-bold border-2 p-2 rounded-lg bg-amber-500/90 cursor-pointer select-none
        transition-transform duration-150 hover:bg-amber-600 `}
              >
                ID: {user.slice(0, 4)}...
              </span>

              <Link href="/trips/my">
                <Button className="whitespace-nowrap cursor-pointer">
                  My Trips
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          {/* {user && (
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }}
            />
          )} */}
          <span
            className="border-1 p-1 rounded-lg text-sm text-primary"
            title="Click to copy"
            onClick={() => {
              navigator.clipboard.writeText(user);
              alert(`ID copied : ${user}`);
            }}
          >
            {user?.slice(0, 4)}
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {menuOptions.map((menu, index) => (
                <DropdownMenuItem
                  className="border-b border-gray-300 rounded-none"
                  key={index}
                  asChild
                >
                  <Link href={menu.path}>{menu.name}</Link>
                </DropdownMenuItem>
              ))}

              {user ? (
                <>
                  <DropdownMenuItem
                    asChild
                    className="border-b border-gray-300 rounded-none"
                  >
                    <Link href="/trips/create">Create Trip</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="border-b border-gray-300 rounded-none"
                  >
                    <Link href="/trips/my">My-Trips</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  {/* <SignInButton mode="modal"> */}
                  <Button className="w-full">Get Started</Button>
                  {/* </SignInButton> */}
                </DropdownMenuItem>
              )}

              <div className=" px-4 py-2 mt-2 w-full dark:bg-gray-400  dark:text-white font-bold rounded-2xl bg-gray-200">
                Switch Mode : <ModeToggle />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default Header;
