"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { FaWineGlass } from "react-icons/fa";
import {
  FcBiotech,
  FcBriefcase,
  FcBullish,
  FcOldTimeCamera
} from "react-icons/fc";
import * as LucideIcons from "lucide-react"

import { CategoryItem } from "./category-item";
import { ArrowDownZA, LucideIcon } from "lucide-react";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], LucideIcon> = {
  "Básicos": ArrowDownZA,
  "Creación de Contenido": ArrowDownZA,
  "CRM": ArrowDownZA,
  "Marketing": ArrowDownZA,
  "Vino": ArrowDownZA,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="sm:flex grid grid-cols-3 items-center gap-x-2 pb-2">
      {items.map((item) => {

        // @ts-ignore
        const icon= LucideIcons[item.icon]
      
        return (
          <CategoryItem
            key={item.id}
            label={item.name}
            icon={icon}
            value={item.id}
          />
        )})
      }
    </div>
  )
}