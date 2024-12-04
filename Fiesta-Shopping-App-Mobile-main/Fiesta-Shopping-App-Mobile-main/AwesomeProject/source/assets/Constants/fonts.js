import  {Platform}  from 'react-native'

const FONTS = {
    ...Platform.select({
        ios: {
            POPPINS_BLACK: 'PoppinsBlack',
            POPPINS_BLACK_ITALIC: 'PoppinsBlackItalic',
            POPPINS_BOLD: 'PoppinsBold',
            POPPINS_BOLD_ITALIC: 'PoppinsBoldItalic',
            POPPINS_EXTRA_BOLD: 'PoppinsExtraBold',
            POPPINS_EXTRA_BOLD_ITALIC: 'PoppinsExtraBoldItalic',
            POPPINS_EXTRA_LIGHT: 'PoppinsExtraLight',
            POPPINS_EXTRA_LIGHT_ITALIC: 'PoppinsExtraLightItalic',
            POPPINS_ITALIC: 'PoppinsItalic',
            POPPINS_LIGHT: 'PoppinsLight',
            POPPINS_LIGHT_ITALIC: 'PoppinsLightItalic',
            POPPINS_MEDIUM: 'PoppinsMedium',
            POPPINS_MEDIUM_ITALIC: 'PoppinsMediumItalic',
            POPPINS_REGULAR: 'PoppinsRegular',
            POPPINS_SEMIBOLD: 'PoppinsSemiBold',
            POPPINS_SEMIBOLD_ITALIC: 'PoppinsSemiBoldItalic',
            POPPINS_THIN: 'PoppinsThin',
            POPPINS_THIN_ITALIC: 'PoppinsThinItalic',
        },
        android: {
            POPPINS_BLACK: 'PoppinsBlack',
            POPPINS_BLACK_ITALIC: 'PoppinsBlackItalic',
            POPPINS_BOLD: 'PoppinsBold',
            POPPINS_BOLD_ITALIC: 'PoppinsBoldItalic',
            POPPINS_EXTRA_BOLD: 'PoppinsExtraBold',
            POPPINS_EXTRA_BOLD_ITALIC: 'PoppinsExtraBoldItalic',
            POPPINS_EXTRA_LIGHT: 'PoppinsExtraLight',
            POPPINS_EXTRAL_LIGHT_ITALIC: 'PoppinsExtraLightItalic',
            POPPINS_ITALIC: 'PoppinsItalic',
            POPPINS_LIGHT: 'PoppinsLight',
            POPPINS_LIGHT_ITALIC: 'PoppinsLightItalic',
            POPPINS_MEDIUM: 'PoppinsMedium',
            POPPINS_MEDIUM_ITALIC: 'PoppinsMediumItalic',
            POPPINS_REGULAR: 'PoppinsRegular',
            POPPINS_SEMIBOLD: 'PoppinsSemiBold',
            POPPINS_SEMIBOLD_ITALIC: 'PoppinsSemiBoldItalic',
            POPPINS_THIN: 'PoppinsThin',
            POPPINS_THIN_ITALIC: 'PoppinsThinItalic',
        }
    })
    // POPPIN:'PoppinsRegular'
}
export default FONTS;
