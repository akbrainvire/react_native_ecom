import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {videoJSON} from '../../components/videoJson';
import VideoPlayerStream from './VideoPlayerStream';
const VideoPlayerScreen = () => {
  const {darkMode, colors} = useTheme();
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // const apiKey = '4kbgbfJkd17RCVdwbrBLqyNQG694fXwwfV9ybqP4XEFwdMNN5AKRa0tx';
  // useEffect(() => {
  //   const fetchVideos = async () => {
  //     try {
  //       console.log('enter');
  //       const response = await fetch('https://api.pixel.com/videos', {
  //         headers: {
  //           Authorization: `${apiKey}`,
  //         },
  //       });
  //       console.log(response);
  //       const data = await response.json();
  //       setVideos(data.videos);
  //       console.log(data, 'videodtaatat');
  //     } catch (error) {
  //       console.error('Error fetching videos:', error);
  //     }
  //   };

  //   fetchVideos();
  // }, []);

  // Function to handle video selection
  const handleVideoSelect = (video: any) => {
    setSelectedVideo(video);
  };

  // Render individual video item
  const renderVideoItem = ({item}: any) => (
    <TouchableOpacity
      onPress={() => handleVideoSelect(item)}
      style={styles.videoItem}>
      <Image
        source={require('../../assets/logo/gpaylogo.png')}
        style={styles.thumbnail}
      />
      <Text style={{color: darkMode ? colors.white : colors.black}}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  // Render video player or video list based on selected video
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: darkMode ? colors.black : colors.white},
      ]}>
      {selectedVideo ? (
        <VideoPlayerStream item={selectedVideo} />
      ) : (
        <FlatList
          data={videoJSON.categories[0].videos}
          renderItem={renderVideoItem}
          keyExtractor={(item: any) => item.title}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
});

export default VideoPlayerScreen;
