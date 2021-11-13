import "virtual:windi.css";

import { render } from "solid-js/web";

import "./index.css";

import App from "./app";
import { AppContextProvider } from "./app.context";


render(() => (
    <AppContextProvider>
        <App />
    </AppContextProvider>
), document.getElementById("root"));
