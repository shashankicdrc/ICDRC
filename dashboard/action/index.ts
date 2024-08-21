'use server'
import { changeRole, createAdmin } from "@/externalAPI/adminService";
import { createBlog, deleteBlog, updateBlog } from "@/externalAPI/blogSerice";
import { createCaseStudy, deleteCaseStudy, updateCaseStudy } from "@/externalAPI/caseStudyService";
import { revalidateTag } from "next/cache";

export const updateCaseStudyAction = async (token: string, values: any) => {
    const { message, error } = await updateCaseStudy(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getCaseStudy");
    return { data: message };
};

export const createCaseStudyAction = async (token: string, values: any) => {
    const { message, error } = await createCaseStudy(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getCaseStudy");
    return { data: message };
};


export const deleteCaseStudyAction = async (token: string, value: any) => {
    const { message, error } = await deleteCaseStudy(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getCaseStudy");
    return { message };
};

export const updateBlogAction = async (token: string, values: any) => {
    const { message, error } = await updateBlog(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getBlogs");
    return { data: message };
};



export const createBlogAction = async (token: string, values: any) => {
    const { message, error } = await createBlog(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getBlogs");
    return { data: message };
};


export const deleteBlogAction = async (token: string, value: any) => {
    const { message, error } = await deleteBlog(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getBlogs");
    return { message };
};

export const changeRoleAction = async (token: string, value: any) => {
    const { message, error } = await changeRole(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getAdmins");
    return { message };
};

export const addAdminAction = async (token: string, values: any) => {
    const { message, error } = await createAdmin(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getAdmins");
    return { data: message };
};
