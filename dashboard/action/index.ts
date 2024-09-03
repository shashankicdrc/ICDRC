'use server'
import { changeRole, createAdmin, deleteAdmins } from "@/externalAPI/adminService";
import { createBlog, deleteBlog, updateBlog } from "@/externalAPI/blogSerice";
import { createCaseStudy, deleteCaseStudy, updateCaseStudy } from "@/externalAPI/caseStudyService";
import { deleteChatBots } from "@/externalAPI/chatBotService";
import { deleteContacts } from "@/externalAPI/contactService";
import { deleteIndividualCase, updateIndCaseStatus } from "@/externalAPI/indCaseService";
import { addMedia, deleteMedia, editMedia } from "@/externalAPI/medaiService";
import { deleteOrganisationalCase, updateOrgCaseStatus } from "@/externalAPI/orgCaseService";
import { deletePartners } from "@/externalAPI/partnerService";
import { addTeams, deleteTeams, updateTeams } from "@/externalAPI/teamService";
import { addTestimonial, deleteTestimonial, updateTestimonial } from "@/externalAPI/testimonialService";
import { revalidateTag } from "next/cache";

export const updateOrgCaseStatusAction = async (token: string, values: any) => {
    const { message, error } = await updateOrgCaseStatus(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getOrganisationalCase");
    return { data: message };
};

export const updateIndCaseStatusAction = async (token: string, values: any) => {
    const { message, error } = await updateIndCaseStatus(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getIndividualCase");
    return { data: message };
};


export const deleteMediaAction = async (token: string, values: any) => {
    const { message, error } = await deleteMedia(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getMedias");
    return { data: message };
};

export const updateMediaAction = async (token: string, values: any) => {
    const { message, error } = await editMedia(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getMedias");
    return { data: message };
};

export const createMediaAction = async (token: string, values: any) => {
    const { message, error } = await addMedia(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getMedias");
    return { data: message };
};


export const deleteTestimonialAction = async (
    token: string,
    value: string[],
) => {
    const { message, error } = await deleteTestimonial(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getTestimonials");
    return { data: message };
};

export const updateTestimonialAction = async (token: string, values: any) => {
    const { message, error } = await updateTestimonial(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getTestimonials");
    revalidateTag("getTestimonialById");
    return { data: message };
};

export const createTestimonialAction = async (token: string, values: any) => {
    const { message, error } = await addTestimonial(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getTestimonials");
    return { data: message };
};

export const addTeamAction = async (token: string, values: any) => {
    const { message, error } = await addTeams(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getTeams");
    return { data: message };
};



export const updateTeamAction = async (token: string, values: any) => {
    const { message, error } = await updateTeams(token, values);
    if (error) {
        return { error };
    }
    revalidateTag("getTeams");
    return { data: message };
};


export const deleteTeamAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteTeams(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getTeams");
    return { message };
};


export const deleteOrgCaseAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteOrganisationalCase(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getOrganisationalCase");
    return { message };
};


export const deleteIndCaseAction = async (token: string, value: string[]) => {
    const { message, error } = await deleteIndividualCase(token, value);
    if (error) {
        return { error };
    }
    revalidateTag("getIndividualCase");
    return { message };
};

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
