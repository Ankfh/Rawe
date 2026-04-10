import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UploadFileMainView from '../../../components/UploadFile/view/UploadFileMainView';
import AntDesign from 'react-native-vector-icons/AntDesign';

const UploadView = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleUploadSuccess = () => {
    navigation.navigate('HomeMain');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.8}>
        <AntDesign name="arrowleft" size={16} color="#102A43" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Upload Book</Text>
      <View style={styles.contentWrap}>
        <UploadFileMainView onUploadSuccess={handleUploadSuccess} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F8FC',
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E8EEF8',
    marginBottom: 10,
  },
  backButtonText: {
    marginLeft: 6,
    color: '#102A43',
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#102A43',
    marginBottom: 14,
  },
  contentWrap: {
    width: '100%',
  },
});

export default UploadView;
