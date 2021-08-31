import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button,  } from 'react-native';

import Firebase from 'firebase';
require('firebase/firestore');

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions/index';

function Comments(props)
{
    const [comments, setComments] = useState([]);
    const [postId, setPostId] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        
        function matchUserToComment(comments)
        {
            for(let i=0;i<comments.length;i++)
            {
                if(comments[i].hasOwnProperty("user"))
                {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if(user === undefined)
                {
                    props.fetchUsersData(comments[i].creator, false);
                }
                else
                {
                    comments[i].user = user;
                }
            }
            setComments(comments);
        }

        if(props.route.params.postId !== postId)
        {
            Firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .doc(props.route.params.postId)
            .collection("comments")
            .get()
            .then((snapshot) => {
                let comments = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                matchUserToComment(comments);
            });
            setPostId(props.route.params.postId);
        }
        else
        {
            matchUserToComment(comments);
        }
    }, [props.route.params.postId, props.users]);


    const onCommentSend = () =>
    {
        if(text !== "")
        {
            Firebase.firestore()
            .collection("posts")
            .doc(props.route.params.uid)
            .collection("userPosts")
            .doc(props.route.params.postId)
            .collection("comments")
            .add({
                creator: Firebase.auth().currentUser.uid,
                text
            })
        }
        else
        {
            console.log("Can't be empty");
        }
        
    }


    return (
        <View>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View>
                        {
                            item.user !== undefined ?
                                <Text>{ item.user.name } : { item.text }</Text>
                            :
                                <Text>Snapshot User : { item.text }</Text>
                        }
                    </View>
                )}
            />
            <View>
                <TextInput
                    placeholder="Add a comment..."
                    onChangeText={(text) => setText(text)}
                />
                <Button
                    onPress={() => onCommentSend()}
                    title="Send"
                />
            </View>
        </View>
    )
}

const mapStateToProps = (store) => ({
    users: store.usersState.users
});
const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Comments);