import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import theme from "styles/theme";
import GlobalStyles from "styles/global";
import { Router } from "router";
import { BookingProvider } from "contexts";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BookingProvider>
          <ToastContainer />
          <GlobalStyles />
          <Router />
        </BookingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
