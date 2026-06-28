import type { MouseEventHandler } from "react";
import { toast } from "react-toastify";
import { setAuthState } from "../store/auth.slice";
import { clearToken } from "../server/auth.actions";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";

export default function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const logout = async (message = "Logged out successfully") => {
    await clearToken();

    dispatch(
      setAuthState({
        isAuthenticated: false,
        userInfo: null,
      }),
    );

    toast.success(message);
    router.push("/login");
    router.refresh();
  };

  const handleLogout: MouseEventHandler<HTMLButtonElement> = () => {
    void logout();
  };

  return { logout, handleLogout };
}
