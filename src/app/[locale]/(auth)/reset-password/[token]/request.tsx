"use client";
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";


export const requestResetPassword = async (body: unknown) => {
    try {
        const response = await axios.post(apiEndpoint.resetPassword(), body, {
            withCredentials: true,
        });
        return response;
    }catch (error : any) {
        return error.response
    }
    
}