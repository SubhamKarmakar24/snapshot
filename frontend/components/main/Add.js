import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, ImageProps, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomNavigation } from 'react-native-paper';

export default function Add({ navigation })
{
    const [hasPermission, setHasPermission] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const openCamera = () =>
    {
        ImagePicker.openCamera({
            width: 600,
            height: 600,
            cropping: true,
            compressImageQuality: 0.9
        })
        .then(image => {
            setImage(image.path);
            console.log(image);
        })
        .catch(err => {
            setError(err);
            console.log(err);
        });
    }

    const openGallery = () =>
    {
        ImagePicker.openPicker({
            width: 600,
            height: 600,
            cropping: true,
            compressImageQuality: 0.9
        })
        .then(image => {
            setImage(image.path);
            console.log(image);
        })
        .catch(err => {
            setError(err);
            console.log(err);
        });
    }

    const clearTemp = () =>
    {
        ImagePicker.clean()
        .then(() => {
            console.log('removed all tmp images from tmp directory');
        })
        .catch(err => {
            alert(err);
        });
    }

    const save = () =>
    {

    }

    return(
        <View>
            {
                image?
                    <Image
                        style={styles.img}
                        source={{uri: image}}
                    />
                :
                    <MaterialCommunityIcons name="camera-image" color={"#000"} size={windowWidth} />
            }
                
            <View>
                <Button title="Camera" onPress={() => openCamera()} />
                <Button title="Gallery" onPress={() => openGallery()} />
                <Button title="Clear" onPress={() => clearTemp()} />
                <Button title="Save" onPress={() => navigation.navigate("Save", {image})} />
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    img:
    {
        width: Dimensions.get('window').width,
        aspectRatio: 1,
    },
})
