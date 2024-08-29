"use client"
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";

export const addDeliveryLocation = async (body: unknown) => {
    try {
        const response = await httpClient.post(apiEndpoint.deliveryAddress(), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
    
}

export const getAllDeliveryLocation = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.deliveryAddress(), {
            withCredentials: true,
        });
        return response;
    }catch (error: any) {
        return error.response
    }
}

export const deleteDeliveryLocation = async (id: string) => {
    try {
        const response = await httpClient.delete(apiEndpoint.deliveryAddress(), {
            withCredentials: true,
            data: {id}
        });
        return response;
    }catch (error: any) {
        return error.response
    }
}

export const updateDeliveryLocation = async (body: unknown) => {
    try {
        const response = await httpClient.patch(apiEndpoint.deliveryAddress(), body, {
            withCredentials: true,
        });
        return response;
    }catch (error: any) {
        return error.response
    }
}


export const getSingleDeliveryLocation = async (body: unknown) => {
    try {
        const response = await httpClient.post(apiEndpoint.singleDeliveryAddress(), body, {
            withCredentials: true,
        });
        return response;
    }catch (error : any) {
        return error.response
    }
}