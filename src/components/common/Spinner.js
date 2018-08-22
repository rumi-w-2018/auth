import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// ActivityIndicator has size property by default (large or small)
const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export { Spinner };
