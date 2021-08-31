import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE } from "../constants/index";
import Firebase from "firebase";

export function fetchUser()
{
    return((dispatch) => {
        Firebase.firestore()
        .collection("users")
        .doc(Firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) =>
        {
            if(snapshot.exists)
            {
                dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()});
            }
            else
            {
                console.log("Snapshot doesn't exist");
            }
        })
    })
}

export function fetchUserPosts()
{
    return((dispatch) => {
        Firebase.firestore()
        .collection("posts")
        .doc(Firebase.auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) =>
        {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data};
            });
            dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
        })
    })
}

export function fetchUserFollowing()
{
    return((dispatch) => {
        Firebase.firestore()
        .collection("following")
        .doc(Firebase.auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) =>
        {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id;
            });
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        })
    })
}