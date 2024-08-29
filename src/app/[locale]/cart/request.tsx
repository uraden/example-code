"use client"
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";


export const getSingleUser = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.user(), {
            withCredentials: true,
        });
        return response;
    } catch (error:any) {
        return error.response;
    }
};

export const makeOrder = async (body: unknown) => {
    try {
        const response = await httpClient.post(apiEndpoint.orders(), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
}