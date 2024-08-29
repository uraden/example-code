"use client";
import axios from "axios";
import apiEndpoint from "@/api/apiEndpoints";

export const requestLogin = async (body: unknown) => {
  try {
    const response = await axios.post(apiEndpoint.login(), body, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};
