"use server";
import { cookies } from "next/headers";
import { AuthStateType } from "../store/auth.slice";
import axios, { AxiosRequestConfig } from "axios";

export async function setToken(
  token: string,
  rememberMe: boolean,
): Promise<void> {
  const cookieStore = await cookies();

  if (rememberMe) {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });
  } else {
    cookieStore.set("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60, // 1 day
      path: "/",
    });
  }
}

export async function getToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  return token;
}
export async function clearToken(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function varifyToken(): Promise<AuthStateType> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      method: "GET",
      url: "https://ecommerce.routemisr.com/api/v1/auth/verifyToken",
      headers: {
        token,
      },
    };

    const { data } = await axios.request(options);

    if (data.message === "verified") {
      const { name, id, role } = data.decoded;
      return {
        isAuthenticated: true,
        userInfo: { name, id, role },
      };
    }

    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}
