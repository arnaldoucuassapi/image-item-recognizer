import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { Item, ItemProps } from './src/components/Item';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { CameraIcon } from 'lucide-react-native';
import { api } from './src/lib/axios';
import { Loading } from './src/components/Loading';

interface ItemDataType extends ItemProps {
  id: string
}

export default function App() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const [items, setItems] = useState<ItemDataType[] | null>(null);
  const [loading, setLoading] = useState(false);

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

        setLoading(true);

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

        setItems(result.data.outputs[0].data.concepts);

        setLoading(false);

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
          >Seleccione uma imagem</Text>
        )}

        <Image style={styles.image} source={{ uri: image}} />
      </View>

      <View style={styles.card}>
        <View style={styles.tip}>
          <Text style={styles.tipText}>Aqui irá aparecer as dicas</Text>
        </View>

        {loading && <Loading />}
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {items && 
            items.map((item) => (
              <Item key={item.id} name={item.name} value={item.value} />
            ))
          }
        </ScrollView>
      </View>

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
    paddingVertical: 24,
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
