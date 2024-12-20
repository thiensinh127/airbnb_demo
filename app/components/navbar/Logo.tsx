"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export const Logo = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      alt="Logo"
      height={100}
      width={100}
    />
  );
};
