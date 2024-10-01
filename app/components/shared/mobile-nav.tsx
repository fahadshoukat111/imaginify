"use client";
import { navLinks } from "@/app/constants";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/dist/client/components/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <header className="header flex items-center gap-2 md:py-2">
      <Link href={"/"}>
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger asChild>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <SheetHeader>
                <>
                  <Image
                    src="/assets/images/logo-text.svg"
                    alt="Logo"
                    width={152}
                    height={23}
                  />
                  <ul className="header-nav_elements">
                    {navLinks.map((link) => {
                      const isActive = link.route === pathname;
                      return (
                        <li
                          key={link.route}
                          className={`sidebar-nav_element group ${
                            isActive &&
                            "grient-text p-18 flex whitespace-nowrap text-dark-700"
                          }`}
                        >
                          <Link
                            className="sidebar-link cursor-pointer"
                            href={link.route}
                          >
                            <Image
                              src={link.icon}
                              alt="nav-logo"
                              width={24}
                              height={24}
                            />
                            {link.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
                {/* <SheetDescription>
                 
                </SheetDescription> */}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href={"/sign-in"}>Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
