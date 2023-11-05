"use server"

import { revalidatePath } from "next/cache";
import { FormValues } from "../_components/form";
import { create, eliminate, getCategories, getCategory, update } from "./services";
import { Category } from "@prisma/client";


export type CategoryDAO = {
    id: string
    name: string
    icon: string | null
}

export async function extract(category: Category): Promise<CategoryDAO> {
    const data: CategoryDAO= {
        id: category.id,
        name: category.name,
        icon: category.icon
    }
    return data
}


export async function getCategoriesDAO() {
    const categories= await getCategories()

    const data: CategoryDAO[]= await Promise.all(categories.map(extract))
    
    return data    
}

export async function getCategoryDAO(categoryId: string): Promise<CategoryDAO>{
    const category= await getCategory(categoryId)

    const data: CategoryDAO= await extract(category)
    return data
}

export async function createAction(data: FormValues): Promise<CategoryDAO> {       
    const created= await create(data)

    console.log(created);

    revalidatePath(`/admin/categories`)

    const res= extract(created)

    return res
}
  
export async function updateAction(categoryId: string, data: FormValues): Promise<CategoryDAO> {  
    const edited= await update(categoryId, data)

    revalidatePath(`/admin/categories`)

    const res= extract(edited)

    return res   
}


export async function eliminateAction(categoryId: string): Promise<CategoryDAO> {    
    const deleted= await eliminate(categoryId)

    revalidatePath(`/admin/categories`)

    const res= extract(deleted)

    return res
}

