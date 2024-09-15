import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId="108304163126-i68kgm8db39r4m977lo39hosdl916viv.apps.googleusercontent.com">
        <StrictMode>
            <App />
            <Toaster />
        </StrictMode>
    </GoogleOAuthProvider>
);
