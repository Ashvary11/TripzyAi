"use client";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/darkMode";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const menuOptions = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Pricing",
      path: "/pricing",
    },
    {
      name: "Contact Us",
      path: "/contact-us",
    },
  ];
  const { user } = useUser();
  // console.log(user);

  const path = usePathname();
  // console.log(path);

  return (
    <div className="flex justify-between items-center p-4">
      {/* //Logo// */}
      <Link href={"/"}>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
          <h2 className="font-bold text-2xl ">Tripzy-Ai</h2>
        </div>
      </Link>
      {/* Menu Options */}
      <div className="flex gap-5 items-center">
        {menuOptions.map((menu, index) => {
          return (
            <Link href={menu.path} key={index}>
              <h2 className="text-lg hover:scale-105 transition-all hover:text-primary">
                {menu.name}
              </h2>
            </Link>
          );
        })}

        <ModeToggle/>
      </div>
      {/* Get Started Button */}
      <div>
        {!user ? (
          <SignInButton mode="modal">
            <Button>Get Started</Button>
          </SignInButton>
        ) : path == "/my-trips" ? (
          <Link href={"/create-new-trip"}>
            <Button className="cursor-pointer">Create-New-Trip</Button>
          </Link>
        ) : (
          <Link href={"/my-trips"}>
            <Button className="cursor-pointer">My-Trips</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
