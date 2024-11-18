import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import appStore from "./store/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import store from "./store/store.js"

const persistor = persistStore(store);
// import { Auth0Provider } from "@auth0/auth0-react";

// const domain = import.meta.env.AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
// const clientId = "108304163126-i68kgm8db39r4m977lo39hosdl916viv.apps.googleusercontent.com"
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <Provider store={appStore}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
            <Toaster />
        </GoogleOAuthProvider>
    </StrictMode>
);
