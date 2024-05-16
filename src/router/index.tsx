import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "pages/Home";
import { Dashboard } from "pages/Dashboard";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <main
              style={{
                display: "flex",
                padding: "1rem",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "white" }}>404</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
