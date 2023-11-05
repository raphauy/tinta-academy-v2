import { prisma } from "@/lib/db";
import { FormValues } from "../_components/form";


export const ROLES = ['user', 'teacher', 'admin'] as const;

export async function getUsers() {

  const found = await prisma.user.findMany({
    orderBy: {
      emailVerified: 'desc',
    },
  })

  return found;
}

export async function getUser(id: string) {

  const found = await prisma.user.findUnique({
    where: {
      id
    },
  })

  if (!found) throw new Error(`User not found with id: ${id}`)

  return found
}

export async function create(data: FormValues) {
  
  const created= await prisma.user.create({
    data: {
      name: data.nombre,
      email: data.email,
      role: data.rol,
    },
  })

  return created
}

export async function update(id: string, data: FormValues) {
  console.log(data);
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data: {
      name: data.nombre,
      email: data.email,
      role: data.rol,
    },
  })

  return updated
}

export async function setUserName(id: string, name: string) {
  
  const updated= await prisma.user.update({
    where: {
      id
    },
    data: {
      name
    },
  })

  return updated
}

export async function eliminate(id: string) {
  
  const deleted= await prisma.user.delete({
    where: {
      id
    },
  })

  return deleted
}
