"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginDataType, loginSchema } from "../schemas/login.schem";

export default async function loginAction(loginFormData: LoginDataType) {
  const validationResult = loginSchema.safeParse(loginFormData);

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
    const { rememberMe, ...loginData } = loginFormData;

    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
      method: "POST",
      data: loginData,
    };

    const { data } = await axios.request(options);

    if (data.message === "success") {
      return {
        success: true,
        message: "Login successful",
        data,
      };
    }

    return {
      success: false,
      message: "Login failed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message;

      if (errorMessage === "Incorrect email or password") {
        return {
          success: false,
          message: "Wrong email or password",
          errors: {
            password: "Incorrect email or password",
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
