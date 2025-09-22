"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkMode";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function Header() {
  const menuOptions = [{ name: "Home", path: "/" }];
  const { user } = useUser();
  const path = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md transition-colors duration-300 dark:text-amber-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4 gap-4 flex-wrap md:flex-nowrap">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/logo.svg" alt="logo" width={36} height={36} />
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
                <span className="text-lg sm:text-xl text-gray-800 dark:text-amber-100 hover:text-primary hover:scale-105 transition-all cursor-pointer dark:hover:text-amber-300 ">
                  {menu.name}
                </span>
              </Link>
            ))}
          </nav>

          <ModeToggle />

          {!user ? (
            <SignInButton mode="modal">
              <Button className="whitespace-nowrap">Get Started</Button>
            </SignInButton>
          ) : path === "/my" ? (
            <Link href="/create">
              <Button className="whitespace-nowrap cursor-pointer dark:bg-amber-900 dark:text-white dark:hover:bg-amber-800">Create Trip</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <UserButton />
              <Link href="/my">
                <Button className="whitespace-nowrap cursor-pointer">My Trips</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Dropdown Menu */}
        <div className="md:hidden ml-auto flex items-center gap-2">
          {user && (
            <UserButton
              appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }}
            />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">☰</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {menuOptions.map((menu, index) => (
                <DropdownMenuItem key={index} asChild>
                  <Link href={menu.path}>{menu.name}</Link>
                </DropdownMenuItem>
              ))}

              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/create">Create Trip</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/my">My-Trips</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <SignInButton mode="modal">
                    <Button className="w-full">Get Started</Button>
                  </SignInButton>
                </DropdownMenuItem>
              )}

              <div className="px-4 py-2">
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
