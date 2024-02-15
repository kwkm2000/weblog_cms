import React from "react";
import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Link } from "react-router-dom";
import { useUser } from "@/features/auth/hooks/useUser";

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

  console.log("user", user.user);

  const routes = user.user ? protectedRoutes : publicRoutes;
  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
