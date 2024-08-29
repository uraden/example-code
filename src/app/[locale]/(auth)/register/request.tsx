"use client"
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";

export const requestRegister = async (body: unknown) => {
    try {
        const response = await axios.post(apiEndpoint.register(), body, {
            withCredentials: true,
        });
        return response;
    }catch (error : any) {
        return error.response
    }
    
}