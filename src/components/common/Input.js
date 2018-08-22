import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

const Input = ({ label, text, placeholder, secureTextEntry, onChangeText }) => {
  const { containerStyle, labelStyle, inputStyle } = styles;
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        placeholder={placeholder}
        value={text}
        style={inputStyle}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  inputStyle: {
    height: 20,
    width: 100,
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 5,
    flex: 2
  }
});

export { Input };
