import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";


export const isLoggedIn = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.isLoggedIn(), {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        console.log(error);
        return error.response;
    }
};