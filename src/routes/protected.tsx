import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "@/components/Layout/MainLayout";

const Home = React.lazy(() => import("@/pages/Home"));
const ArticleNew = React.lazy(() => import("@/pages/article/New"));
const ArticleDetailPage = React.lazy(() => import("@/pages/article/Detail"));
const TagNew = React.lazy(() => import("@/pages/tag/New"));
const ImagesUpload = React.lazy(() => import("@/pages/images/Upload"));

const App = () => {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/tag/new", element: <TagNew /> },
      { path: "/article/new", element: <ArticleNew /> },
      { path: "/article/:id", element: <ArticleDetailPage /> },
      { path: "/images/upload", element: <ImagesUpload /> },
      { path: "/", element: <Home /> },
      { path: "*", element: <Navigate to="." /> },
    ],
  },
];
