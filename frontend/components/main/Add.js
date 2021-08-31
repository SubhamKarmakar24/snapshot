import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation })
{
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [image, setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() =>
    {
        (async () =>
            {
                const cameraStatus = await Camera.requestPermissionsAsync();
                setHasCameraPermission(cameraStatus.status === 'granted');

                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(galleryStatus.status === 'granted');
            }
        )();
    }, []);

    const takePicture = async () =>
    {
        if(camera)
        {
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
        }
    }

    const pickImage = async () =>
    {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        
        if(!result.cancelled)
        {
            setImage(result.uri);
        }
    }


    if(hasCameraPermission === null || hasGalleryPermission === null)
    {
        return <View />;
    }
    if(hasCameraPermission === false || hasGalleryPermission === false)
    {
        return <Text>No access to camera</Text>;
    }
  
    return (
        <View style={{flex: 1}}>
            <View style={styles.cameraContainer}>
                <Camera style={styles.fixedRatio} type={type} ratio={'4:3'} 
                    ref={ref => setCamera(ref)} />
            </View>
            <Button
                title="Flip Camera"
                onPress={() => {
                    setType(type === Camera.Constants.Type.back? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }} />
            <Button title="Snap" onPress={() => takePicture()} />
            <Button title="Choose from Gallery" onPress={() => pickImage()} />
            <Button title="Save" onPress={() => navigation.navigate("Save", {image})} /> 
            {image && <Image source={{uri: image}} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({

    cameraContainer:
    {
        flex: 1,
    },
    fixedRatio:
    {
        // height: '80%',
        aspectRatio: 0.75,
    },
    image:
    {
        flex: 1,
    }

}); 