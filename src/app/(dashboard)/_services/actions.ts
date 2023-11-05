"use server"

import { Course } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { create, createAttachment, deleteAttachment, eliminate, enroll, getAllCourses, getCourse, getTeacherCourses, publish, unpublish, update } from "./course-service";
import { getCategory } from "@/app/admin/categories/_services/services";
import { ChapterOrder, createChapter, eliminateChapter, getChapter, progress, publishChapter, reorder, unpublishChapter, updateChapter } from "./chapter-service";
import { redirect } from "next/navigation";

export type CourseDAO = {
    id: string
    userId: string
    title: string
    description: string | null
    imageUrl: string | null
    price: number | null
    isPublished: boolean
    categoryId: string | null
    categoryName: string | null
    createdAt: Date
    updatedAt: Date
}

export type FormValues = {
    title?: string
    description?: string
    imageUrl?: string
    price?: number
    isPublished?: boolean
    categoryId?: string
}

export type ChapterFormValues = {
    title?: string
    description?: string
    videoUrl?: string
    position?: number
    isPublished?: boolean
    isFree?: boolean
}

export async function extract(course: Course): Promise<CourseDAO> {
    let categoryName= null
    if (course.categoryId) {
        const category= await getCategory(course.categoryId)
        categoryName= category.name
    }
    const data: CourseDAO= {
        id: course.id,
        userId: course.userId,
        title: course.title,
        description: course.description,
        imageUrl: course.imageUrl,
        price: course.price,
        isPublished: course.isPublished,
        categoryId: course.categoryId,
        categoryName,
        createdAt: course.createdAt,
        updatedAt: course.updatedAt
    }
    return data
}


export async function getTeacherCoursesDAO() {
    const courses= await getTeacherCourses()

    const data: CourseDAO[]= await Promise.all(courses.map(extract))
    
    return data    
}

export async function getAllCoursesDAO() {
    const courses= await getAllCourses()

    const data: CourseDAO[]= await Promise.all(courses.map(extract))
    
    return data    
}

export async function getCourseDAO(id: string): Promise<CourseDAO>{
    const course= await getCourse(id)
    if (!course) throw new Error(`Course not found with id: ${id}`)

    const data: CourseDAO= await extract(course)
    return data
}

export async function createAction(title: string): Promise<CourseDAO> {       
    const created= await create(title)

    console.log(created);

    const res= extract(created)

    return res
}

export async function updateTitleAction(courseId: string, title: string): Promise<boolean> {
    const updated= await update(courseId, {title})

    if (!updated) return false

    revalidatePath(`/dashboard/courses/${courseId}`)

    return true
}

export async function updateDescriptionAction(courseId: string, description: string): Promise<boolean> {
    const updated= await update(courseId, {description})

    if (!updated) return false

    revalidatePath(`/dashboard/courses/${courseId}`)

    return true
}

export async function updateAction(CourseId: string, data: FormValues): Promise<CourseDAO> {  
    const edited= await update(CourseId, data)

    const res= extract(edited)

    revalidatePath(`/dashboard/courses/${CourseId}`)

    return res   
}


export async function eliminateAction(id: string): Promise<CourseDAO> {    
    const deleted= await eliminate(id)

    const res= extract(deleted)

    revalidatePath("/admin/courses")

    return res
}

export async function publishAction(id: string): Promise<CourseDAO> {    
    const published= await publish(id)

    const res= extract(published)

    return res
}

export async function unpublishAction(id: string): Promise<CourseDAO> {    
    const unpublished= await unpublish(id)

    const res= extract(unpublished)

    return res
}

export async function enrollAction(id: string): Promise<boolean> {
    const enrolled= await enroll(id)

    if (!enrolled) return false

    return true
}

/**
 * Attachments
 */

export async function createAttachmentAction(courseId: string, url: string): Promise<boolean> {    
    const created= await createAttachment(courseId, url)

    if (!created) return false

    return true
}

export async function deleteAttachmentAction(courseId: string): Promise<boolean> {    
    const deleted= await deleteAttachment(courseId)

    if (!deleted) return false

    return true
}

/**
 * Chapters
 */

export async function createChapterAction(courseId: string, title: string): Promise<boolean> {    
    const created= await createChapter(courseId, title)

    if (!created) return false

    revalidatePath(`/teacher/courses/${created.courseId}`)

    return true
}

export async function updateChapterTitleAction(chapterId: string, title: string): Promise<boolean> {    
    const updated= await updateChapter(chapterId, { title })

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}
export async function updateChapterDescriptionAction(chapterId: string, description: string): Promise<boolean> {
    const updated= await updateChapter(chapterId, { description })

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}

export async function updateChapterIsFreeAction(chapterId: string, isFree: boolean): Promise<boolean> {
    const updated= await updateChapter(chapterId, { isFree })

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}

export async function publishChapterAction(chapterId: string, isPublished: boolean): Promise<boolean> {
    const updated= await publishChapter(chapterId)

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}

export async function unPublishChapterAction(chapterId: string, isPublished: boolean): Promise<boolean> {
    const updated= await unpublishChapter(chapterId)

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}

export async function updateChapterVideoUrlAction(chapterId: string, videoUrl: string): Promise<boolean> {
    const updated= await updateChapter(chapterId, { videoUrl })

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}
    



export async function updateChapterAction(chapterId: string, data: ChapterFormValues): Promise<boolean> {    
    const updated= await updateChapter(chapterId, data)

    if (!updated) return false

    revalidatePath(`/teacher/courses/${updated.courseId}/chapters/${updated.id}`)

    return true
}

export async function eliminateChapterAction(chapterId: string): Promise<CourseDAO> {    
    const deleted= await eliminateChapter(chapterId)

    const course= await getCourse(deleted.courseId)
    if (!course) throw new Error(`Course not found with id: ${deleted.courseId}`)

    const res= extract(course)

    redirect(`/teacher/courses/${course.id}`)

    return res
}

export async function reorderChaptersAction(courseId: string, list: ChapterOrder[]): Promise<boolean> {    
    const updated= await reorder(courseId, list)

    if (!updated) return false

    revalidatePath(`/teacher/courses/${courseId}`)

    return true
}

export async function progressAction(isCompleted: boolean, chapterId: string) {
    const updated= await progress(isCompleted, chapterId)

    if (!updated) return false

    const chapter= await getChapter(chapterId)
    if (!chapter) throw new Error(`Chapter not found with id: ${chapterId}`)


    revalidatePath(`/teacher/courses/${chapter.courseId}/chapters/${chapter.id}`)

    return true
}