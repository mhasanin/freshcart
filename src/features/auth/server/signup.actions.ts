"use server";
import { SignupDataType, signupSchema } from "../schemas/signup.schem";
import Axios, { AxiosRequestConfig } from "axios";

export default async function signupAction(SignupData: SignupDataType) {
  const validationResult = signupSchema.safeParse(SignupData);
  if (!validationResult.success) {
    const errors: Record<string, string> = {};
    if (validationResult.error) {
      validationResult.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        const errorMessage = issue.message;
        if (!errors[fieldName]) {
          errors[fieldName] = errorMessage;
        }
      });
    }
    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }
  const { terms, ...sentSignupData } = SignupData;
  try {
    const options: AxiosRequestConfig = {
      url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
      method: "POST",
      data: sentSignupData,
    };
    const { data } = await Axios.request(options);
    if (data.message === "success") {
      return {
        success: true,
        message: "Signup successful",
        data,
      };
    }
    return {
      success: false,
      message: data.message || "Signup failed",
    };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message;

      if (
        errorMessage === "Account Already Exists" ||
        (errorMessage === "fail" &&
          error.response?.data?.errors?.msg?.includes("already exists"))
      ) {
        return {
          success: false,
          message: "An account with this email already exists",
          errors: {
            email: "An account with this email already exists",
          },
        };
      }

      return {
        success: false,
        message: errorMessage || "Signup failed at network level",
        errors: {
          email: errorMessage || "Signup failed at network level",
        },
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
      errors: {
        email: "An unexpected error occurred. Please try again.",
      },
    };
  }
}
