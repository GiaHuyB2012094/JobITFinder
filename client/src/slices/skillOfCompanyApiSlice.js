import { apiSlice } from "./apiSlice";
const SKILL_URL = "/api/skillofcompany";

export const skillOpCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSkills: builder.query({
            query: (data) => ({
                url: `${SKILL_URL}/skills`,
                method: 'GET',
                body: data,
            })
        })
    })
})

export const { useGetSkillsQuery } = skillOpCompanyApiSlice;