import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";


export const requestPasswordRestRequest = async (body: unknown) => {
    try {
        const response = await axios.post(apiEndpoint.requestPasswordReset(), body, {
        withCredentials: true,
        });
        return response;
    } catch (error) {
        return error;
    }
}