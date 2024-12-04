const COLOR_SCHEME = {
    LIGHT: 'light',
    DARK: 'dark',
}
/**
   * @params {string} black - #1e1e1e
   *  @params {string} white - #EEEEEE
*/

export const COLORS_LIGHT = {
    secondary: '#1e1e1e',
    primary: '#ffffff',
    tertiary: '#c2c2c2',
    borderColor: '#b6b4b4',
    button: 'white'
};
/**
 * Component mô tả một màn hình chi tiết.
 *
 * @param {Object} props - Các thuộc tính truyền vào cho component.
 * @param {"Grid"||"Flex"} layout - Đối tượng route chứa các tham số.
 Tham số khác.
 *
 * @param {string} secondary
 * @param {string} primary - Đối tượng route chứa các tham số.
 *  @param {string} tertiary
 * @param {string} button
 */

export const COLORS_DARK = {
    secondary: '#EEEEEE',
    primary: '#1e1e1e',
    tertiary: '#363636',
    borderColor: '#b6b4b4',
    button: 'black'
};


import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../util/AppContext";
import { Appearance, LogBox } from "react-native";




// let currentTheme = null;

// const event = Appearance.addChangeListener(({colorScheme}) => {
//     currentTheme = colorScheme;
//     console.log('Theme changed to:', currentTheme);
//     return colorScheme
// });

// Hàm để lấy màu sắc hiện tại dựa trên theme
// const getTheme = async () => {
//     const currentTheme = await AsyncStorage.getItem("mode")
//     LogBox.ignoreAllLogs();
//     console.log("Mode:", currentTheme, currentTheme == "dark");
//     return currentTheme == "dark" ? COLORS_DARK : COLORS_LIGHT;
// }

export const setMode = async (mode) => {
    if (mode)
        return await AsyncStorage.setItem("mode", mode)
    return false
}
export const getMode = async () => {
    const currentTheme = await AsyncStorage.getItem("mode")
    return currentTheme
}
// export const color =  getTheme()
