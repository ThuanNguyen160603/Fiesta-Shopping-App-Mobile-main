import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import Item, { ItemFlex, ItemGrid } from './Item';
/**
 * Component mô tả một màn hình chi tiết.
 *
 * @param {Object} props - Các thuộc tính truyền vào cho component.
 * @param {"Grid"||"Flex"} layout - Đối tượng route chứa các tham số.
 Tham số khác.
 *
 * @param {true||false} horizontal - Đối tượng route chứa các tham số.
 */


const ProductList1 = ({
  data,
  header,
  style,
  layout,
  horizontal,
  isLoading,
  LoadingMore }) => {

  const flashListRef = useRef(null); // Tạo ref cho FlashList

  useEffect(() => {
    if (flashListRef.current) {
      flashListRef.current.scrollToOffset({ animated: true, offset: -10 }); // Cuộn về đầu danh sách
    }


  }, [layout])




  const Loading = () => {
    return (
      <View>
        <ActivityIndicator size={'large'} color={'cyan'} style={{ justifyContent: 'center', alignItems: 'center' }} />
      </View>
    )
  }
  return (

    <FlashList
      ref={flashListRef}
      ListFooterComponent={isLoading && Loading()}
      horizontal={horizontal ? horizontal : false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={header?header:null}
      data={data}

      contentContainerStyle={{ paddingBottom: 0,paddingRight:horizontal?20:0 }}
      onEndReachedThreshold={1}
      decelerationRate={0.7}
      onEndReached={LoadingMore}
      estimatedItemSize={200}
      extraData={layout}
      numColumns={horizontal ? 1 : layout == "Grid" ? 2 : 1}
      renderItem={({ item, index }) =>
        <Item
          key={item._id}
          itemData={item}
          index={index}
          layout={layout}
          horizontal={horizontal}
        />

      }
    >

    </FlashList>
  )
}
// export const data = [
//   {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 1,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something ...',
//     price: 1000
//   }, {
//     _id: 2,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something ...',
//     price: 1000
//   }, {
//     _id: 3,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something ...',
//     price: 1000
//   },
//   {
//     _id: 4,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something ...',
//     price: 1000
//   }, {
//     _id: 5,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   }, {
//     _id: 0,
//     image: 'http://www.shutterstock.com/image-photo/art-portrait-woman-black-turtleneck-600nw-2313398105.jpg',
//     designer: 'The Orders',
//     name: 'Something just happened suddenly hahahahaha hahahaha  ...',
//     price: 1000
//   },
// ]
export default ProductList1