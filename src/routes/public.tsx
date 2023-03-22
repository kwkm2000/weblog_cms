import React from "react";
import { AuthRoutes } from "@/features/auth/routes";
// const AuthRoutes = React.lazy(() => import("@/features/auth/routes"));

export const publicRoutes = [
  {
    path: "/auth/*",
    element: <AuthRoutes />,
  },
];
