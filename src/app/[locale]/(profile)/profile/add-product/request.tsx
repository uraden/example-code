import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";

export const addNewProduct = async (body: unknown) => {
    try {
        const response = await httpClient.post(apiEndpoint.newProduct(), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
};

export const getAllNewlyAddedProducts = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.newProduct(), {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response;
    }
}