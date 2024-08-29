import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";
import { httpClient } from "@/api/apiConfig";

export const addNewItemsArrayToOrder = async (body: unknown) => {
 try{
    const response = await httpClient.patch(apiEndpoint.orders('addNewItemArrayOrder'), body, {
        withCredentials: true,
    });
    return response;
 } catch (error: any){
     return error.response;
 }
};