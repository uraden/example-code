"use client"
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";

export const getAllProducts = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.products(), {
            withCredentials: true,
        });
        return response;
    }catch (error: any) {
        return error.response
    }
}

export const getProductById = async (id: string) => {
    try {
        const response = await httpClient.get(apiEndpoint.singleProduct(id), {
            withCredentials: true,
        });
        return response;
    }catch (error: any) {
        return error.response
    }
}

export const addProductToOrder = async (body: unknown) => {
    try {
        const response = await httpClient.patch(apiEndpoint.orders('addNewItemToOrder'), body, {
            withCredentials: true,
        }
        )
        return response;
    }catch (error: any) {
        return error.response
    }
}

