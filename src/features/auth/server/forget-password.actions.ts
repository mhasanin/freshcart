"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ForgetPasswordDataType, forgetPasswordSchema } from "../schemas/forget-password.schem";

export default async function forgetPasswordAction(forgetPasswordFormData: ForgetPasswordDataType) {
  const validationResult = forgetPasswordSchema.safeParse(forgetPasswordFormData);

  if (!validationResult.success) {
    const errors: Record<string, string> = {};

    validationResult.error.issues.forEach((issue) => {
      const key = issue.path[0] as string;
      const message = issue.message;

      if (!errors[key]) {
        errors[key] = message;
      }
    });

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      method: "POST",
      data: forgetPasswordFormData,
    };

    const { data } = await axios.request(options);

    if (data.statusMsg === "success") {
      console.log("Reset code sent to your email:", data);
      return {
        success: true,
        message: data.message || "Reset code sent to your email",
        data,
      };
    }

    return {
      success: false,
      message: "Failed to send reset code",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        return {
          success: false,
          message: errorMessage,
          errors: {
            email: errorMessage,
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