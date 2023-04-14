import { useRoutes } from "react-router-dom";
import { useUser } from "@/lib/auth";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Link } from "react-router-dom";

export const AppRouters = () => {
  const user = useUser();
  const commonRoutes = [
    {
      path: "/",
      element: (
        <div>
          <p>😀</p>
          <Link to={"/auth/login"}>to Login Page</Link>
        </div>
      ),
    },
  ];
  const routes = user.data ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
