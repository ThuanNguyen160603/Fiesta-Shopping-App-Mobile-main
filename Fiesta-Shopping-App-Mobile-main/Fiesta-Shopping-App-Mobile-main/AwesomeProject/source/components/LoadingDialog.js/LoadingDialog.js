
import { Modal,View,ActivityIndicator } from "react-native";
const ShowLoadingDialog = ({isLoading,setIsLoading}) => {

    // Giả sử bạn thực hiện một hành động nào đó cần thời gian và sau khi hoàn tất, ẩn dialog đi

   
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={isLoading}
            onRequestClose={() => setIsLoading(false)}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <View style={{
                    backgroundColor: '#FFFFFF',
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActivityIndicator animating={isLoading} size="large" color="#0000ff" />
                </View>
            </View>
        </Modal>
    )
};
export default ShowLoadingDialog