"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { resetPasswordSchema, type ResetPasswordDataType } from "../schemas/forget-password.schem";
export default async function resetPasswordAction(resetPasswordFormData: ResetPasswordDataType) {
  const validationResult = resetPasswordSchema.safeParse(resetPasswordFormData);

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
      url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
      method: "PUT",
      data: {
        email: resetPasswordFormData.email,
        newPassword: resetPasswordFormData.newPassword,
      },
    };

    const { data } = await axios.request(options);

    if (data.message) {
      return {
        success: true,
        message: data.message || "Password reset successfully.",
      };
    }

    return {
      success: true,
      message: "Password reset successfully.",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;
      if (errorMessage) {
        return {
          success: false,
          message: errorMessage,
          errors: {
            newPassword: errorMessage,
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