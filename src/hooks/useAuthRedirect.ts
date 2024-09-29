import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";

const useAuthRedirect = (currentRoute: string) => {
  const user = useSelector((state: RootState) => state.user.value);
  const navigate = useNavigate();
  const protectedRoutes = ["/welcome", "/profile"];

  useEffect(() => {
    if (user === null) {
      navigate("/");
    } else if (!protectedRoutes.includes(currentRoute)) {
      navigate("/welcome");
    }
  }, [user]);
};

export default useAuthRedirect;
