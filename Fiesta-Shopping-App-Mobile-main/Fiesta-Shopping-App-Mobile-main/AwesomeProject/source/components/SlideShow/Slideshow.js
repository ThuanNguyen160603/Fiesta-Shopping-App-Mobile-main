import { StyleSheet, View, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import Pagination from './pagination';
import SlideItems from './SlideItems';

const Slideshow = (props) => {
  const {
    onItemClick,
    imagesource,
    isAutoSroll,
    width,
    flex,
    heightRate,
    widthRate,
    paginationEnabled,
    styleItem,
    styleViewWelcome,
  } = props;

  const [index, setIndex] = useState(0);
  const [imageSource, setImageSource] = useState([]);
  const [autoScroll, setAutoScroll] = useState(false);
  const [widthR, setWidthR] = useState('80%');
  const [flexH, setflexH] = useState(0.8);
  const [hRate, sethRate] = useState(0.4);
  const [wRate, setwRate] = useState(1);
  const [enablePagination, setEnablePagination] = useState(false);

  useEffect(() => {
    const customSlideshow = () => {
      setImageSource(imagesource || []);
      setAutoScroll(isAutoSroll || false);
      setWidthR(width || '80%');
      setflexH(flex || 0.8);
      sethRate(heightRate || 0.4);
      setwRate(widthRate || 1);
      setEnablePagination(paginationEnabled || false);
    };
    console.log(imageSource.length);
    customSlideshow();
  }, [imagesource, isAutoSroll, width, flex, heightRate, widthRate, paginationEnabled]);

  const flatListRef = useRef(null);
  const indexRef = useRef(index);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

 
  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setIndex(viewableItems[0].index);
    }
  }).current;

 

  const scrollToIndex = (index) => {
    
    flatListRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5,
    });
    setIndex(index);
  };

  return (
    <View style={styleViewWelcome || {}}>
      <FlatList
        keyExtractor={(item) => item.id}
        nestedScrollEnabled={true}
        ref={flatListRef}
        data={imageSource}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        renderItem={({ item,index }) => (
          <SlideItems
            index={index}
            onClick={onItemClick}
            styleItem={styleItem}
            item={item}
            widthR={widthR}
            flexH={flexH}
            heightRate={hRate}
            widthRate={wRate}
          />
        )}
      />
      <Pagination
        data={imageSource}
        indexP={index}
        setNewIndex={scrollToIndex}
        enablePagination={enablePagination}
      />
    </View>
  );
};

export default Slideshow;
