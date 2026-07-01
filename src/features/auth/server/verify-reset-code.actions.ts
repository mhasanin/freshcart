"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { VerifyResetCodeDataType, verifyResetCodeSchema } from "../schemas/forget-password.schem";

export default async function verifyResetCodeAction(verifyResetCodeFormData: VerifyResetCodeDataType) {
  const validationResult = verifyResetCodeSchema.safeParse(verifyResetCodeFormData);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;
      if (!errors[key]) errors[key] = message;
    });

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "POST",
      data: verifyResetCodeFormData,
    };

    const { data } = await axios.request(options);

  
    if (data.status === "Success") {
      return {
        success: true,
        message: "Code verified successfully",
        data,
      };
    }

    return {
      success: false,
      message: "Failed to verify code",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        return {
          success: false,
          message: errorMessage,
          errors: {
            resetCode: errorMessage, 
          },
        };
      }
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}