import { apiSlice } from "./apiSlice";
const INDUSTRY_URL  = "/api/industryofcompany"

export const industryOfCompanyApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getIndustry: builder.query({
            query: (data) => ({
                url: `${INDUSTRY_URL}/industryList`,
                method: 'GET',
                body: data,
            })
        })
    })
})

export const { useGetIndustryQuery } = industryOfCompanyApiSlice;