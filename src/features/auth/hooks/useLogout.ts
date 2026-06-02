import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setAuthState } from "../store/auth.slice";
import { clearToken } from "../server/auth.actions";
import { useRouter } from "next/navigation";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = async () => {
    await clearToken();

    dispatch(
      setAuthState({
        isAuthenticated: false,
        userInfo: null,
      }),
    );
    toast.success("Logged out successfully");
    router.push("/login");

    router.refresh();
  };

  return { logout };
}
