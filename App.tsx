import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Item } from './src/components/Item';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { CameraIcon } from 'lucide-react-native';
import { api } from './src/lib/axios';

export default function App() {
  const [image, setImage] = useState<string | undefined>(undefined);

  async function openImagesLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status == 'granted') {
      const selection = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
        base64: true
      })

      if (!selection.canceled) {

        setImage(selection.assets[0].uri);

        const requestBody = {
          user_app_id: {
            user_id: process.env.EXPO_PUBLIC_USER_ID,
            app_id: process.env.EXPO_PUBLIC_APP_ID
          },
          inputs: [
            {
              data: {
                image: {
                  base64: selection.assets[0].base64,
                }
              }
            }
          ]
        }

        const result = await api.post(`/models/${process.env.EXPO_PUBLIC_MODEL_ID}/versions/${process.env.EXPO_PUBLIC_MODEL_VERSION_ID}/outputs`, requestBody);

        console.log(result.data.outputs[0].data.concepts)

      }
    }
  }

  return (
    <View style={styles.container}>      
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={openImagesLibrary} activeOpacity={0.7}>
          <CameraIcon color='#50C878' size={34} />
        </TouchableOpacity>

        {!image && (
          <Text 
            style={{ color: '#000', textAlign: 'center', top: '45%' }}
          >Seleccione a imagem de um prato</Text>
        )}

        <Image style={styles.image} source={{ uri: image}} />
      </View>

      <ScrollView style={styles.card}>
        <View style={styles.tip}>
          <Text style={styles.tipText}>Aqui irá aparecer a dica bônus</Text>
        </View>

        <Item text='Egge' />
      </ScrollView>

      <StatusBar style="dark" backgroundColor='#fff' translucent />
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    paddingTop: 14
  },
  button: {
    position: 'absolute',
    top: 32,
    right: 16,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 4,
    zIndex: 8
  },
  buttonText: {
    color: 'white'
  }, 
  imageContainer: {
    width: screenWidth,
    height: '44%',
    alignItems: 'center'
  },
  image: {
    width: screenWidth,
    height: '100%',
  },
  card: {
    position: 'absolute',
    bottom: 0,
    zIndex: 6,
    width: screenWidth,
    height: '60%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  tip: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 2,
    backgroundColor: '#50C878',
    borderRadius: 4, 
    marginBottom: 24
  }, 
  tipText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  }
});
