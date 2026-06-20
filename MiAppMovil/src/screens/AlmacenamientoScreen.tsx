import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { supabase } from '../services/supabaseClient'; 

const BUCKET_NAME = 'uploads';

export default function AlmacenamientoScreen() {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tu galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setMessage(null);
    }
  };

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
      setMessage(null);
    }
  };

  const uploadAsset = async (uri: string, originalName: string, mimeType: string) => {
    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();

    const extension = originalName.split('.').pop() || 'bin';
    const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${extension}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(uniqueName, arrayBuffer, { contentType: mimeType, upsert: false });

    if (error) throw error;
    return data;
  };

  const handleUpload = async () => {
    if (!image && !file) {
      Alert.alert('Nada que subir', 'Selecciona una imagen y/o un archivo primero.');
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      if (image) {
        const name = image.fileName || 'imagen.jpg';
        const mime = image.mimeType || 'image/jpeg';
        const data = await uploadAsset(image.uri, name, mime);
        console.log('Imagen subida:', data);
      }

      if (file) {
        const name = file.name || 'archivo';
        const mime = file.mimeType || 'application/octet-stream';
        const data = await uploadAsset(file.uri, name, mime);
        console.log('Archivo subido:', data);
      }

      setMessage({ type: 'success', text: '✅ Subida completada con éxito.' });
    } catch (err: any) {
      console.log('Error de subida:', err);
      setMessage({ type: 'error', text: `❌ Error: ${err.message || 'No se pudo subir.'}` });
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Button title="Seleccionar imagen" onPress={pickImage} />
        {image && <Image source={{ uri: image.uri }} style={styles.preview} />}
      </View>

      <View style={styles.section}>
        <Button title="Seleccionar archivo" onPress={pickFile} />
        {file && <Text style={styles.fileName}>{file.name}</Text>}
      </View>

      <View style={styles.section}>
        <Button title="Subir al servicio" onPress={handleUpload} disabled={uploading} />
      </View>

      {uploading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 16 }} />}

      {message && (
        <Text style={[styles.message, message.type === 'error' && styles.errorText]}>
          {message.text}
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, alignItems: 'center', paddingTop: 24 },
  section: { marginBottom: 24, alignItems: 'center', width: '100%' },
  preview: { width: 180, height: 180, marginTop: 12, borderRadius: 8 },
  fileName: { marginTop: 8, fontSize: 14, color: '#333' },
  message: { marginTop: 16, fontSize: 16, textAlign: 'center', color: 'green' },
  errorText: { color: 'red' },
});