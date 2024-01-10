import React from "react";
import { ROUTE } from "../constants/router";
import SignInPage from "../pages/SignInPage";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BaseLayout from "../components/BaseLayout";
import TemplatePage from "../pages/TemplatePage";
import TemplateDetailPage from "../pages/TemplateDetailPage";
import ScanPage from "../pages/ScanPage";

export default function AppRouter() {
  const routes = [
    { path: ROUTE.HOME, element: HomePage },
    { path: ROUTE.SIGNIN, element: SignInPage },
    { path: ROUTE.TEMPLATE, element: TemplatePage },
    { path: ROUTE.TEMPLATEDETAIL, element: TemplateDetailPage },
    { path: ROUTE.SCAN, element: ScanPage },
  ];
  return (
    <Routes>
      {routes.map((route) => {
        const { element: Component } = route;
        if (route.path === "/") {
          return (
            <Route key={route.path} {...route} element={<Component />}></Route>
          );
        } else {
          return (
            <Route
              key={route.path}
              {...route}
              element={
                <BaseLayout>
                  <Component />
                </BaseLayout>
              }
            ></Route>
          );
        }
      })}
    </Routes>
  );
}
