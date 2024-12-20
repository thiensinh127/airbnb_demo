"use client";
import React, { lazy } from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach !",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmills !",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is modern !",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is close to the beach !",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property is pools !",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property is islands !",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property is lake !",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property is skiing !",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property is castles !",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has camping activities !",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "This property has arctic activities !",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has cave activities !",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property has desert activities !",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has barns activities !",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property has luxury activities !",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) return null;
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            description={item.description}
            selected={category === item.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
