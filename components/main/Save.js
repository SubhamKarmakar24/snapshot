import React, { useState, useFocusEffect, useCallback } from 'react';
import { View, TextInput, Image, StyleSheet, Button, BackHandler } from 'react-native';
import * as RootNavigation from '../navigation/RootNavigation';

import Firebase from 'firebase';
require("firebase/firestore");
require("firebase/firebase-storage");

export default function Save(props)
{
    //https://reactnavigation.org/docs/preventing-going-back/
    // Make the changes from here

    const [caption, setCaption] = useState("");

    const uploadImage = async () =>
    {
        const uri = props.route.params.image;
        const childPath = `post/${Firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath);

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = Firebase.storage().ref().child(childPath).put(blob);

        const taskProgress = snapshot =>
        {
            console.log(`transferred: ${snapshot.bytesTransferred}`);
        }

        const taskCompleted = () =>
        {
            task.snapshot.ref.getDownloadURL().then((snapshot) =>
            {
                console.log(snapshot);
            });
        }

        const taskError = snapshot =>
        {
            console.log(snapshot);
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: props.route.params.image}} />
            <TextInput
                placeholder="Write a caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}

const styles = StyleSheet.create({

    container:
    {
        flex: 1,
    },
    image:
    {
        height: 200,
        width: 200,
        aspectRatio: 0.75,
    }

});