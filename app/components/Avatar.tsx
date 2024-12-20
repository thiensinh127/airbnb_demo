"use client";

import Image from "next/image";

export const Avatar: React.FC<{ src?: string }> = ({ src }) => {
  return (
    <Image
      className="hidden md:block cursor-pointer rounded-full"
      src={src ? src : "/images/avatar.png"}
      alt="Logo"
      height={32}
      width={32}
    />
  );
};
