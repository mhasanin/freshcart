"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { addressSchema, AddressFormDataType } from "../schemas/addresses.schema";
import { GetAddressesResponseType, MutateAddressResponseType } from "../types/addresses.types";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/addresses";

async function getAuthHeader() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || "";
  return { token };
}

export async function getAddressesAction() {
  try {
    const headers = await getAuthHeader();
    const options: AxiosRequestConfig = {
      url: BASE_URL,
      method: "GET",
      headers,
    };

    const { data } = await axios.request<GetAddressesResponseType>(options);

    if (data.status === "success") {
      return {
        success: true,
        data: data.data,
      };
    }

    return {
      success: false,
      message: "Failed to fetch addresses",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong while fetching addresses.";
    return {
      success: false,
      message: serverMessage,
    };
  }
}

export async function addAddressAction(addressFormData: AddressFormDataType) {
  const validationResult = addressSchema.safeParse(addressFormData);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  try {
    const headers = await getAuthHeader();
    const options: AxiosRequestConfig = {
      url: BASE_URL,
      method: "POST",
      headers,
      data: addressFormData,
    };

    const { data } = await axios.request<MutateAddressResponseType>(options);

    if (data.status === "success") {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    }

    return {
      success: false,
      message: "Failed to add address",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong. Please try again later.";
    return {
      success: false,
      message: serverMessage,
    };
  }
}

export async function deleteAddressAction(addressId: string) {
  if (!addressId) {
    return {
      success: false,
      message: "Address ID is required",
    };
  }

  try {
    const headers = await getAuthHeader();
    const options: AxiosRequestConfig = {
      url: `${BASE_URL}/${addressId}`,
      method: "DELETE",
      headers,
    };

    const { data } = await axios.request<MutateAddressResponseType>(options);

    if (data.status === "success") {
      return {
        success: true,
        message: data.message,
        data: data.data,
      };
    }

    return {
      success: false,
      message: "Failed to remove address",
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong. Please try again later.";
    return {
      success: false,
      message: serverMessage,
    };
  }
}

export async function updateAddressAction(oldAddressId: string, newAddressData: AddressFormDataType) {
  const validationResult = addressSchema.safeParse(newAddressData);
  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      errors[key] = issue.message;
    });
    return { success: false, message: "Validation failed", errors };
  }

  try {
    const addResponse = await addAddressAction(newAddressData);
    if (!addResponse.success) {
      return { success: false, message: addResponse.message || "Failed to create the updated address entry." };
    }

    const deleteResponse = await deleteAddressAction(oldAddressId);
    if (!deleteResponse.success) {
      return { 
        success: true, 
        message: "Address updated, but clearing the old entry failed. You might see a duplicate.",
        data: addResponse.data 
      };
    }

    return {
      success: true,
      message: "Address updated successfully.",
      data: addResponse.data
    };
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const serverMessage = axiosError.response?.data?.message || "Something went wrong during the update process.";
    return { success: false, message: serverMessage };
  }
}