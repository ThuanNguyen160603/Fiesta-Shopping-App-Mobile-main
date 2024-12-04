import { FONTS } from "../../assets/Constants";

export const POPPINS_FONT = {
    regular: FONTS.POPPINS_REGULAR,
    bold: FONTS.POPPINS_BOLD,
    semibold: FONTS.POPPINS_SEMIBOLD,
    black:FONTS.POPPINS_BLACK,
    black_italic: FONTS.POPPINS_BLACK_ITALIC,
    extra_bold: FONTS.POPPINS_EXTRA_BOLD,
    extra_light: FONTS.POPPINS_EXTRA_LIGHT,
    extra_light_italic: FONTS.POPPINS_EXTRA_LIGHT_ITALIC,
    light: FONTS.POPPINS_LIGHT,
    light_italic: FONTS.POPPINS_LIGHT_ITALIC,
    medium: FONTS.POPPINS_MEDIUM,
    medium_italic: FONTS.POPPINS_MEDIUM_ITALIC,
    semibold_italic: FONTS.POPPINS_SEMIBOLD_ITALIC,
    thin: FONTS.POPPINS_THIN,
    thin_italic: FONTS.POPPINS_THIN_ITALIC
}
export const LIGHT_DARK_MODE = (isModeApply) => {
    var DARK_THEME = {
        primary: "#1a1919",
        secondary: "#ffffff"
    }
    var LIGHT_THEME = { 
        primary: "#ffffff",
        secondary: "#1a1919"
    }
    return isModeApply === "DARK_MODE" ? DARK_THEME : LIGHT_THEME;
}
