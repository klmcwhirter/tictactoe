import { createContext, useContext } from "solid-js";
import { AppModel } from "./models";

const model: AppModel = new AppModel();

const appContext = createContext<AppModel>(model);

export function AppContextProvider(props) {

    return (
        <appContext.Provider value={model}>
            {props.children}
        </appContext.Provider>
    );
}

export function useAppState() { return useContext(appContext); }
