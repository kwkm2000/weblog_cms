import { useRoutes } from "react-router-dom";
import { useUser } from "@/lib/auth";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export const AppRouters = () => {
  const user = useUser();
  const commonRoutes = [{ path: "/", element: <div>😀</div> }];
  const routes = user.data ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
