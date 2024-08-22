'use server'
import { changeRole, createAdmin, deleteAdmins } from "@/externalAPI/adminService";
import { createBlog, deleteBlog, updateBlog } from "@/externalAPI/blogSerice";
import { createCaseStudy, deleteCaseStudy, updateCaseStudy } from "@/externalAPI/caseStudyService";
import { deleteChatBots } from "@/externalAPI/chatBotService";
import { deleteContacts } from "@/externalAPI/contactService";
import { deletePartners } from "@/externalAPI/partnerService";
import { revalidateTag } from "next/cache";

export const deleteContactAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteContacts(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getPartners");
    return { message };
};

export const deleteParntersAction = async (token: string, value: string[]) => {
    const { message, error } = await deletePartners(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getPartners");
    return { message };
};

export const deleteChatBotAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteChatBots(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getChatBots");
    return { message };
};


export const deleteAdminsAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteAdmins(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getAdmins");
    return { message };
};

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
