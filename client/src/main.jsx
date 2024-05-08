import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";

import store from "./store.js";
import { ConfigProvider } from "antd";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          {/* Ant design */}
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "#dee4fe",
                  // rowHoverBg: "#eef2ff",
                },
              },
            }}
          >
            <App />
          </ConfigProvider>
          {/* <ReactQueryDevtools initialIsOpen/> */}
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
