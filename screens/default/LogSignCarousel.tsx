import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Image} from 'react-native-elements';
import CustomButtonComponent from '../../components/generic/CustomButtonComponent';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useTheme} from '../../context/ThemeContext';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const Slide = React.memo(({data, darkMode}: any) => {
  // console.log(data);

  return (
    <View style={[styles.slideContainer, {height: windowHeight * 0.8}]}>
      <View style={styles.imageContainer}>
        <Image
          source={data.image}
          style={{
            width: windowWidth * 0.9,
            height: windowHeight * 0.6,
            // transform: [{skewY: '-4deg'}],
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            borderBottomLeftRadius: 70,
            borderBottomRightRadius: 170,
            objectFit: 'cover',
          }}
          onError={error =>
            console.error('Image loading error:', error)
          }></Image>
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 40,
          // paddingVertical: 40,
          // height: '45%',
          // flex: 1,
          // alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: darkMode ? 'white' : 'black',
          }}
          numberOfLines={2}>
          {data.title}
        </Text>
        <Text
          style={{fontSize: 14, color: darkMode ? '#d3d3d3' : 'grey'}}
          numberOfLines={2}>
          {data.subtitle}
        </Text>
      </View>
    </View>
  );
});
const NextBtn = ({onSubmit, complete, darkMode}: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
      <View
        style={[
          styles.buttonstyle,
          {backgroundColor: darkMode ? 'white' : 'black'},
          complete && styles.completedBtn,
        ]}>
        <Icon
          name={'arrow-right'}
          size={30}
          color={darkMode ? 'black' : 'white'}
        />
      </View>
    </TouchableOpacity>
  );
};
const LogSignCarousel = ({navigation, route}: any) => {
  console.log(route);

  const {id} = route.params;

  const flatListRef = useRef<FlatList | null>(null);
  const [activeIndex, setactiveIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const {darkMode} = useTheme();
  const slideList = [
    {
      id: 1,
      image: require('../../assets/m3.jpg'),
      title: `20% Discount New Available Products`,
      subtitle: `Publish up your selfies to make yourself more beautiful with this app.`,
    },
    {
      id: 2,
      image: require('../../assets/m4.jpg'),
      title: `Take Advantage Of The Offer Shopping`,
      subtitle: `Publish up your selfies to make yourself more beautiful with this app.`,
    },
    {
      id: 3,
      image: require('../../assets/m5.jpg'),
      title: `All Types Offer Within Your Reach`,
      subtitle: `Publish up your selfies to make yourself more beautiful with this app.`,
    },
  ];

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((e: any) => e.id, []),
    getItemLayout: useCallback(
      (_: any, index: any) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth,
      }),
      [],
    ),
  };

  const handlePageChange = (index: number) => {
    flatListRef.current?.scrollToIndex({index, animated: true});
  };

  const handleNext = () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex === slideList.length) {
      if (id === 'login') {
        navigation.navigate('Login', {
          id: 'login',
        });
      } else if (id === 'signup') {
        navigation.navigate('Signup', {
          id: 'signup',
        });
      } else {
        navigation.navigate('Error Screen', {message: 'No valid route found'});
      }
    }
    if (nextIndex < slideList.length) {
      handlePageChange(nextIndex);
      // setComplete(false);
    } else {
      setComplete(true);
    }
  };

  // console.log(activeIndex);
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? 'black' : 'white'},
      ]}>
      <FlatList
        ref={flatListRef}
        data={slideList}
        style={{flex: 1}}
        renderItem={({item}) => {
          return <Slide data={item} darkMode={darkMode} />;
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          const {contentOffset} = event.nativeEvent;
          const index = Math.floor((contentOffset.x + 1) / windowWidth);
          // console.log(index, contentOffset, windowWidth);
          setactiveIndex(index);
          if (index + 1 === slideList.length) {
            setComplete(true);
          } else {
            setComplete(false);
          }
        }}
        {...flatListOptimizationProps}
      />
      <View
        style={[
          styles.dotandBtnContainer,
          {
            height: windowHeight * 0.1,
          },
        ]}>
        <View style={styles.dotContainer}>
          {slideList.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handlePageChange(index)}
              style={[
                index === activeIndex ? styles.selectedCircle : styles.dot,
                {
                  backgroundColor:
                    index === activeIndex
                      ? darkMode
                        ? 'white'
                        : 'black'
                      : '#e1e1e1',
                },
              ]}></TouchableOpacity>
          ))}
        </View>
        <View style={styles.nextBtn}>
          <NextBtn
            onSubmit={handleNext}
            darkMode={darkMode}
            complete={complete}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    height: windowHeight,
  },
  slideContainer: {
    overflow: 'hidden',

    // height: windowHeight,
    width: windowWidth,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: windowWidth * 0.9,
    borderTopRightRadius: 300,
    height: windowHeight * 0.6,
    borderBottomRightRadius: 290,
  },
  dotContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    // position: 'absolute',
    // bottom: 10,
    // width: '100%',
  },
  dot: {
    width: 7,
    height: 6,
    borderRadius: 15,
    marginHorizontal: 3,
    // backgroundColor: '#e1e1e1',
    // borderWidth: 2,
    padding: 1,
    // borderColor: 'black',
    // position: 'absolute',
    // bottom: 0,
  },
  selectedCircle: {
    width: 25,
    height: 6,
    borderRadius: 15,
    marginHorizontal: 3,
    // backgroundColor: 'black',
    padding: 1,
  },
  dotandBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nextBtn: {
    // paddingBottom: 20,
  },
  button: {},

  buttonstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    width: 55,
    borderRadius: 40,
    // backgroundColor: 'black',
  },
  completedBtn: {
    backgroundColor: '#00d824',
  },
});
export default LogSignCarousel;
