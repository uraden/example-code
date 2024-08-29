"use client"
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";

export const getAllOrders = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.orders(), {
            withCredentials: true,
        });
        return response;
        
    } catch (error: any) {
        return error.response; 
    }
}

export const getUserOrders = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.orders('getUserOrders'), {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
}

export const updateOrderStatus = async (body: unknown) => {
    try {
        const response = await httpClient.patch(apiEndpoint.orders('updateOrderStatus'), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
}

export const updateItemStatusFromOrder = async (body: unknown) => {
    try {
        const response = await httpClient.patch(apiEndpoint.orders('updateItemStatusFromOrder'), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
}

export const isLoggedIn = async () => {
    try {
        const response = await httpClient.get(apiEndpoint.userLoggedIn(), {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response; 
    }
}

// export const addNextDeliveryDate = async (body: any) => {
//     try {
//         const response = await httpClient.patch(apiEndpoint.orders('addNextDeliveryDate'), body, {
//             withCredentials: true,
//         });
//         return response;
//     } catch (error: any) {
//         return error.response
//     }
// }

export const updateProductAmount = async (body: any) => {
    try {
        const response = await httpClient.patch(apiEndpoint.orders('updateItemQuantInOrder'), body, {
            withCredentials: true,
        });
        return response;
    } catch (error: any) {
        return error.response
    }
}