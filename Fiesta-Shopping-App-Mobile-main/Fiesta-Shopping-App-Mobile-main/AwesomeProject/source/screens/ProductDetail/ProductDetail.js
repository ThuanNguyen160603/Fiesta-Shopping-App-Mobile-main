import React, { useState, useRef, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StatusBar, ImageBackground, SafeAreaView, Modal, StyleSheet, FlatList, Alert, ToastAndroid } from 'react-native';
import StyleProductDetail from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { StylePublic, commonStyles } from '../../css/styles/public';
import Slideshow from '../../components/SlideShow/Slideshow';
import { styleCoProdScreen } from '../CategoryofProductScreen/Styles';
import Wrapper from '../../components/Wrapper';
import { Dimensions } from 'react-native';
import { styleCart } from '../Cart/styles';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { POPPINS_FONT } from '../../css/theme/Theme';
import { useNavigation } from '@react-navigation/native';
import AxiosInstance from '../../util/AxiosInstance';
import ImageDisplayModal from '../../components/ImageDisplayModal/ImageDisplayModal';
import { useSelector } from 'react-redux';
import { dataUserSelector } from '../../redux-store';
import { useTranslation } from 'react-i18next';
const height = Dimensions.get('screen').height
const width = Dimensions.get('screen').width;

const ProductDetail = ({ route }) => {
  const { productId, screenName } = route.params

  const [quantity, setQuantity] = useState(1)
  const { t } = useTranslation()
  const [data, setData] = useState(null)
  const [dimensions, setDimensions] = useState(null)
  const [images, setImages] = useState([])
  const [dimensionKeys, setDimensionKeys] = useState([])
  // 
  const userData = useSelector(dataUserSelector)
  const [numLines, setNumLines] = useState(3)
  const [imageDisplayVisible, setImageDisplayVisible] = useState(false)
  const [indexImage, setIndexImage] = useState(0)
  const [variationId, setVariationId] = useState(null)
  const [selectedDimension, setSelectedDimension] = useState({})
  const [stock, setStock] = useState(0)
  const navigation = useNavigation()
  const state = navigation.getState();
  const routes = state.routes;
  const previousRoute = routes[routes.length - 2]; // Screen trước screen hiện tại

  // if (previousRoute) {
  //   console.log('Tên screen trước đó là:', previousRoute.name);
  // }
  const paragraphLimit = () => {
    if (numLines == 0)
      setNumLines(3)
    else
      setNumLines(0)
  }

  const handleItemImageClick = (index) => {
    setIndexImage(index);
    setImageDisplayVisible(true)

  }
  const Header = (props) => {
    return (
      <View
      >
        <View style={[styleCoProdScreen.header, { marginTop: "-125%" }]}>

          <TouchableOpacity

            style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-circle" color={"black"} size={50} />

          </TouchableOpacity>
          <View />
        </View>
      </View>
    )
  }
  const getDataProductDetail = async () => {
    try {
      const response = await AxiosInstance.get(`productApi/getProductByID?id=${productId}`);
      if (response.result) {

        setData(response.data)
        getAttributeFromData(response.data)
      }

    } catch (error) {
      console.log("Get data product detail error: ", error);
    }
  }
  const checkStockProduct = async (variationId) => {
    try {
      const response = await AxiosInstance.get(`productApi/getStockProduct?productId=${data._id}&variationId=${variationId}`)
      if (response.result)
        setStock(Number(response.data[0].stock))
    } catch (error) {
      console.log("checkStockProduct: ", error);
    }
  }
  const getAttributeFromData = (data) => {
    let imageList = []
    let dimensionsOpt = {}
    let dimensionKeyss = []
    //  Get image list for slideshow
    if (typeof data.images !== 'undefined' && data.images.length > 0)
      imageList = [...imageList, ...data.images]

    // Get dimension to show 
    if (typeof data.variations !== 'undefined' && data.variations.length > 0) {


      if (typeof data.variations[0].dimension !== 'undefined')
        dimensionKeyss = Object.keys(data.variations[0].dimension)

      data.variations.map((item, index) => {
        if (typeof item.subImage.url !== 'undefined')
          imageList.push(item.subImage)

        if (typeof item.dimension !== 'undefined') {

          dimensionKeyss.forEach((key, index) => {
            if (typeof dimensionsOpt[key] !== 'undefined' && Array.isArray(dimensionsOpt[key]))
              dimensionsOpt[key].push(item.dimension[key])
            else
              dimensionsOpt[key] = [item.dimension[key]]

          })
        }
      })
    }
    setImages(imageList)
    setDimensionKeys(dimensionKeyss)
    setDimensions(dimensionsOpt)

  }

  useEffect(() => {
    getDataProductDetail()

    return () => {

    }
  }, [])
  const setStyleBottomNavigion = () => {
    const style = previousRoute.name == "Home"||"PurchaseScreen" ? {
      display: 'flex',
      backgroundColor: "white", position: 'absolute', borderTopLeftRadius: 30,
      borderTopRightRadius: 30, height: 70, paddingLeft: 30, paddingRight: 30,
    } : { display: 'none' }

    return style
  }
  useEffect(() => {
    navigation.getParent().getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none'
      }
    });
    setStyleBottomNavigion()
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: setStyleBottomNavigion()
      })
    };
  }, [navigation]);
  useEffect(() => {
    if (data && typeof data.variations !== 'undefined' && Object.keys(selectedDimension).length == dimensionKeys.length) {
      const newarr = data.variations.filter(item => {
        return JSON.stringify(item.dimension) == JSON.stringify(selectedDimension)
      })
      if (newarr.length > 0) {
        checkStockProduct(newarr[0]._id)
        setVariationId(newarr[0]._id)
      }
      else {
        setVariationId(null)
        setStock(0)
      }
    } else {
      setVariationId(null)
      setStock(0)
    }

    return () => {

    }
  }, [selectedDimension])

  const addToCart = async () => {

    try {
      const newCart = { userId: userData._id, quantity: quantity, variationId: variationId, productId: data._id }

      const response = await AxiosInstance.post("cart/add", { addFields: newCart })
      if (response.result)
        ToastAndroid.show("ADD TO CART SUCCESSFULLY", ToastAndroid.SHORT)

    } catch (error) {
      console.log("ADD TO CART ERROR: ", error);
    }
  }

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[2]}
        style={{backgroundColor:'white'}}
      >
        <View style={{ flex: 1 }}>
          <Slideshow
            onItemClick={handleItemImageClick}
            children={Header}
            isAutoSroll={false}
            width={'100%'}
            imagesource={images}
            flex={0.8}
            image
            heightRate={0.7}
            paginationEnabled={true}
          />
          <Header />


        </View>

        <View style={[StyleProductDetail.BigView,{borderWidth:0.5,borderColor:'gray'}]}>
          <Wrapper>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <View style={{}}>

                </View>
                <Text style={StyleProductDetail.title}>{data ? data.name : ""}</Text>
                {/* <Text style={StyleProductDetail.regular}>The space</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <StarRatingDisplay
                    rating={data ? data.rating : 0}
                    style={{ width: 110, height: 30, alignItems: 'center' }}
                    starSize={20}
                    starStyle={{ width: 10 }}
                  />
                  {/* <Text>
                    ( 259 Reviews )
                  </Text> */}
                </View>

              </View>
              <View style={{ alignSelf: 'center', alignItems: 'flex-end', marginTop: 8 }}>
                <View style={[StyleProductDetail.quantity, { backgroundColor: '#e4e4e4', }]}>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity > 1)
                        setQuantity(prev => prev - 1)

                    }}
                  >
                    <Text style={[, { fontFamily: POPPINS_FONT.regular, fontSize: 13, afontSize: 15, margin: 0 }]}>-</Text>
                  </TouchableOpacity>
                  <TextInput style={[, { fontFamily: POPPINS_FONT.regular, fontSize: 14, textAlign: 'center', height: 50, color: 'black', margin: 0 }]} value={"" + quantity} onChangeText={(text) => setQuantity(text)}></TextInput>
                  <TouchableOpacity
                    onPress={() => {
                      if (quantity < 100)
                        setQuantity(prev => prev + 1)

                    }}
                  >
                    <Text style={[, { fontFamily: POPPINS_FONT.regular, fontSize: 13, fontSize: 15, margin: 0 }]}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[StyleProductDetail.title, { fontSize: 14, marginTop: 15, marginBottom: 10 }]} >{stock} in stock</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>

              {
                dimensionKeys.length > 0 &&
                dimensionKeys.map((key) => {
                  return (
                    <View

                    >
                      <Text
                        style={[StyleProductDetail.title, { fontSize: 17, margin: 10 }]}
                      >{key.toUpperCase()}</Text>
                      <View
                        style={{ flexDirection: 'row', flexWrap: 'wrap' }}
                      >
                        {dimensions && dimensions[key].map((item) => (
                          <TouchableOpacity
                            activeOpacity={0.5}
                            style={[StyleProductDetail.itemSizeView, {
                              marginHorizontal: 5,
                              backgroundColor: selectedDimension[key] == item ? "#000000" : "white",

                            }]}

                            onPress={() => {
                              if (typeof selectedDimension[key] == 'undefined' || selectedDimension[key] !== item)
                                setSelectedDimension({ ...selectedDimension, [key]: item })
                              else {
                                let selectedDimension2 = { ...selectedDimension }
                                delete selectedDimension2[key]
                                setSelectedDimension(selectedDimension2)
                              }

                            }}
                          >

                            <Text style={[{ fontFamily: POPPINS_FONT.regular, color: selectedDimension[key] == item ? "white" : "black" }]}>{item}</Text>

                          </TouchableOpacity>))}
                      </View>
                    </View>
                  )
                })
              }

            </View>


            <View>
              <Text style={[StyleProductDetail.title, { fontSize: 17, marginVertical: 10 }]}>Description</Text>
              <View>
                <Text
                  style={[StyleProductDetail.regular, { width: 370 }]}
                  ellipsizeMode='tail'
                  numberOfLines={numLines}
                >
                  {data ? data.Description : ""}

                </Text>
                {numLines == 3 && <Text
                  onPress={() => paragraphLimit()}
                  style={[StyleProductDetail.regular, {}]}>{t("See more")}</Text>}

                {numLines == 0 && <Text
                  onPress={() => paragraphLimit()}
                  style={[StyleProductDetail.regular, {}]}>{t("See less")}</Text>}
              </View>
            </View>

          </Wrapper>
        </View>
        {images.length > 0 &&
          <ImageDisplayModal
            imageArray={images}
            visible={imageDisplayVisible}
            onClose={() => { setImageDisplayVisible(false) }}
            index={indexImage}
          />
        }

      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Wrapper>
          <View style={[StyleProductDetail.addCartView, {}]}>
            <View>
              <Text style={[StyleProductDetail.regular, { color: '#d1c8c8' }]}>{t("Total Price")}</Text>
              <Text style={[StyleProductDetail.title, { color: '#000000' }]}>${variationId == null ? 0 : quantity * Number(data.variations.filter((item) => { return item._id == variationId })[0].price)}</Text>
            </View>
            <TouchableOpacity
              disabled={stock > 0 ? false : true}
              onPress={() => {
                addToCart()

              }}
              style={[
                commonStyles.btnAccess_dark
                , {
                  backgroundColor: stock > 0 ? 'black' : 'gray',
                  width: 220,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 10,
                  maxWidth: 290
                }]}
            >
              <Icon name='cart-outline' size={30} color={"white"} />
              <Text style={[StyleProductDetail.title, { color: '#ffffff' }]}>{t("Add to cart")}</Text>
            </TouchableOpacity>
          </View>
        </Wrapper>
      </View>
    </View>
  );
};

export default ProductDetail;
