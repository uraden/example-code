"use client";
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";

export const submitOTP = async (body: unknown) => {
    try {
        const response = await axios.post(apiEndpoint.verifyOtp(), body, {
        withCredentials: true,
        });
        return response;
    } catch (error) {
        return error;
    }
};
