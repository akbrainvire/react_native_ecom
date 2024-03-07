import React, {useState, useRef} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Video from 'react-native-video';

const VideoPlayerStream = ({item}: any) => {
  const videoRef = useRef<any>(null);

  const handleOnProgress = (data: any) => {
    // console.log(data);
  };

  const {width, height} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{uri: item.sources[0]}}
        style={styles.video}
        controls={true}
        onProgress={handleOnProgress}
        poster={`https://fastly.picsum.photos/id/${width}/${height * 0.4}`}
      />
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  video: {
    width: width,
    height: height * 0.4,
    position: 'relative',
  },
});

export default VideoPlayerStream;
