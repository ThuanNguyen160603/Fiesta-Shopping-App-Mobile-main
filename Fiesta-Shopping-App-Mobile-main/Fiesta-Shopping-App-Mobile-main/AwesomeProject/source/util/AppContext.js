import { createContext, useState,useEffect } from "react";
import React,{useContext} from "react";
import { Appearance, LogBox } from "react-native";
import { COLORS_DARK,COLORS_LIGHT } from "../config/ThemeAction";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const { children } = props;
    const [isLogin, setisLogin] = useState(false);
    const [dataUser, setDataUser] = useState({});
    const [currentTheme, setCurrentTheme] = useState(Appearance.getColorScheme());
    useEffect(() => {
        const listener = ({ colorScheme }) => {
            setCurrentTheme(colorScheme);
            console.log('Theme changed to:', colorScheme);
        };

        const subscription = Appearance.addChangeListener(listener);
        return () => {
            subscription.remove();
        };
    }, []);

    LogBox.ignoreAllLogs();
    // console.log("Mode:", currentTheme, currentTheme === "dark");

    const theme = currentTheme === "dark" ? COLORS_DARK : COLORS_LIGHT;
    return (
        <AppContext.Provider value={{theme,isLogin, setisLogin, dataUser, setDataUser }}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext);
}