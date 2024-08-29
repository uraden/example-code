import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";

export const logOut = async () => {
    try {
        const response = await axios.get(apiEndpoint.logout(), {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
}