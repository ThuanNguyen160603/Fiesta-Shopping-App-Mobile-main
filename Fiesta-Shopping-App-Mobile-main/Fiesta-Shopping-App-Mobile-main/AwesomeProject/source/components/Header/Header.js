import { useContext } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, useWindowDimensions } from 'react-native'
import { AppContext } from '../../util/AppContext'
import { styleCoProdScreen } from '../../screens/CategoryofProductScreen/Styles'
import { StylePublic } from '../../css/styles/public'
import { styleCart } from '../../screens/Cart/styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { formatText } from '../../util/CommonFunction'
import { useTranslation } from 'react-i18next'
const Header = ({ onBack, title, name,styleText, styleHeader }) => {
    const { theme } = useContext(AppContext)
    const onHandleClick = () => {
        if (typeof onBack !== 'undefined')
            onBack()
    }
    const {t} = useTranslation()
    return (

        <View style={[styleCoProdScreen.header, { marginBottom: 10, marginTop: 10, justifyContent: 'flex-start' }, styleHeader]}>

            <TouchableOpacity onPress={() => onHandleClick()}>
                <Icon name="arrow-back-circle" color={theme.secondary} size={46} />

            </TouchableOpacity>
            {
                title && title.length > 0 ?
                    <Text style={[{ marginLeft: 8, alignItems: 'center', color: theme.secondary, fontSize: 18, fontWeight: 'bold' }, styleText]}>{formatText(`${t("Search results")}: ${title}`, 36, 1)}</Text>

                    : <View />
            }
{
                name && name.length > 0 ?
                    <Text style={[{ marginLeft: 8, alignSelf: 'center', color: theme.secondary, fontSize: 20, fontWeight: 'bold' }, styleText]}>{name}</Text>

                    : <View />
            }


        </View>



    )
}
export default Header