import axios from "axios"

const provincesAPI = axios.create({
    baseURL: "https://vapi.vnappmob.com/api/province/"
})

export const getProvinces = async () => {
    const response = await provincesAPI.get("/");
    return response.data.results;
}

export default provincesAPI;