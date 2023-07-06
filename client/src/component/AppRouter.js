import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loader } from "./assets/ui/Loader/Loader";
import { authRoutes, publicRoutes } from "../routes";
import NotFound from "../pages/NotFound";
function AppRouter() {
  const isAuth = false;
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        {/* Render authenticated routes if user is authenticated */}
        {isAuth &&
          authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
