import {View, Text} from 'react-native';
import React from 'react';
import Video from 'react-native-video';

const VideoPlayerStream = ({item}: any) => {
  console.log(item);
  return (
    <View style={{flex: 1}}>
      <Video
        source={{
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        }}
        style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
      />
    </View>
  );
};

export default VideoPlayerStream;
