"use client";
import { SafeUser } from "@/app/types";
import React, { Suspense } from "react";
import Container from "../Container";
import { Logo } from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

interface NavbarProps {
  currentUser?: SafeUser | null;
}
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3">
            <Logo />
            <Suspense>
              <Search />
            </Suspense>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Suspense>
        <Categories />
      </Suspense>
    </div>
  );
};

export default Navbar;
