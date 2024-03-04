import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

const PullDownRefresh = ({
  refreshing,
  onRefresh,
}: {
  refreshing: any;
  onRefresh: any;
}) => {
  return <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PullDownRefresh;
