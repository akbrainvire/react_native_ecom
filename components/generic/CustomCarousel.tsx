import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const CustomCarousel = ({images}: {images: string[]}) => {
  const flatListRef = useRef<FlatList | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePageChange = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const handleAutoplay = () => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    handlePageChange(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(handleAutoplay, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item}} style={styles.image} />
        )}
        onScroll={event => {
          const {contentOffset} = event.nativeEvent;
          const index = Math.floor(contentOffset.x / width);
          setActiveIndex(index);
        }}
      />

      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePageChange(index)}
            style={[
              styles.dot,
              // {backgroundColor: index === activeIndex ? 'white' : 'grey'},
            ]}>
            {index === activeIndex ? (
              <View style={[styles.selectedCircle]} />
            ) : (
              ''
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  selectedCircle: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 1.8,
    left: 2,
  },
  image: {
    width,
    height: height * 0.55,
    resizeMode: 'contain',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 5,
    backgroundColor: 'transparent',
    borderWidth: 2,
    padding: 2,
    borderColor: 'white',
    // position: 'absolute',
    // bottom: 0,
  },
});

export default CustomCarousel;
