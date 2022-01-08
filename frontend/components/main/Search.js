import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Search(props)
{
    const [users, setUsers] = useState([]);

    const fetchUsers = (search) =>
    {
        firestore()
        .collection("users")
        .where("name", '>=', search)
        .get()
        .then((snapshot) => {
            let users = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data };
            })
            setUsers(users);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search for other users"
                onChangeText={(search) => fetchUsers(search)}
            />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Profile", { uid: item.id })}
                    >
                        <Text>{ item.name }</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: '#000',
    }
})