import { useEffect, useState } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/blogs/Blogs";
import Landing from "./pages/landing/Landing";
import SingleBlog from "./pages/singleBlog/SingleBlog";
import getBackendHost from "../src/data/getBackendHost.js";
import ErrorPage from "./error/ErrorPage";
import Error from "./error/Error";
import "./language/i18react.js";
import { useTranslation } from "react-i18next";
import Logout from "./pages/logout/Logout";
import Login from "./pages/login/Login";

const BACKEND_HOST = getBackendHost();

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* home route */}
      <Route path="/" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={true} />} errorElement={<Error />}>
        <Route index element={<Landing BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
      </Route>

      {/* login and logout */}
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />

      {/* blogs routes */}
      <Route path="/blogs" element={<Layout BACKEND_HOST={BACKEND_HOST} isHome={false} />} errorElement={<Error />}>
        {/* single blog  route */}
        <Route index element={<Blogs BACKEND_HOST={BACKEND_HOST} />} errorElement={<Error />} />
        <Route path=":id" element={<SingleBlog BACKEND_HOST={BACKEND_HOST} errorElement={<Error />} />} />
      </Route>

      {/* page 404 route */}
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

function App() {
  const { t, i18n } = useTranslation();
  if (i18n.language === "kr" || i18n.language === "ar") {
    document.body.style.direction = "rtl";
  } else {
    document.body.style.direction = "ltr";
  }
  return (
    <div className="App">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
