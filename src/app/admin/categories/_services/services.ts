import { prisma } from "@/lib/db";
import { FormValues } from "../_components/form";
import { CategoryDAO } from "./actions";



export async function getCategories() {

  const found = await prisma.category.findMany({
    orderBy: {
      name: 'asc'
    },
  })

  return found
}

export async function getCategory(id: string) {

  const found = await prisma.category.findUnique({
    where: {
      id
    },
  })

  if (!found) throw new Error(`Category not found with id: ${id}`)

  return found
}

export async function create(data: FormValues) {
  
  const created= await prisma.category.create({
    data
  })

  return created
}

export async function update(id: string, data: FormValues) {
  console.log(data);
  
  const updated= await prisma.category.update({
    where: {
      id
    },
    data
  })

  return updated
}


export async function eliminate(id: string) {
  
  const deleted= await prisma.category.delete({
    where: {
      id
    },
  })

  return deleted
}
