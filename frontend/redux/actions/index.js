import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import
{ 
    USER_STATE_CHANGE,
    USER_POSTS_STATE_CHANGE,
    USER_FOLLOWING_STATE_CHANGE,
    USERS_DATA_STATE_CHANGE,
    USERS_POSTS_STATE_CHANGE,
    USERS_LIKES_STATE_CHANGE,
    CLEAR_DATA
} from '../constants/index';


export function clearData()
{
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA });
    });
}

export function fetchUser()
{
    return((dispatch) =>
    {
        firestore().collection("users")
        .doc(auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if(snapshot.exists)
            {
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
            }
            else
            {
                console.log("User doesn't exist");
            }
        })
    })
}

export function fetchUserPosts()
{
    return((dispatch) =>
    {
        firestore().collection("posts")
        .doc(auth().currentUser.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
        })
    })
}

export function fetchUserFollowing()
{
    return((dispatch) =>
    {
        firestore().collection("following")
        .doc(auth().currentUser.uid)
        .collection("userFollowing")
        .onSnapshot((snapshot) => {
            let following = snapshot.docs.map(doc => {
                const id = doc.id;
                return id
            })
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });

            for(let i=0;i<following.length;i++)
            {
                dispatch(fetchUsersData(following[i], true));
            }
        })
    })
}

export function fetchUsersData(uid, getPosts)
{
    return((dispatch, getState) => {
        const found = getState().usersState.users.some(el => el.uid === uid);

        if(!found)
        {
            firestore()
            .collection("users")
            .doc(uid)
            .get()
            .then((snapshot) =>
            {
                if(snapshot.exists)
                {
                    let user = snapshot.data();
                    user.uid = snapshot.id;
                    dispatch({type: USERS_DATA_STATE_CHANGE, user});
                }
                else
                {
                    console.log("Snapshot doesn't exist");
                }
            })
            if(getPosts)
            {
                dispatch(fetchUsersFollowingPosts(uid));
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid)
{
    return((dispatch, getState) => {
        firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "desc")
        .get()
        .then((snapshot) =>
        {
            //since this is async process, we will lose the respective UID param
            //thus, we are trying to find the UID from the Snapshot
            const uid = snapshot.docs[0].ref.path.split('/')[1];

            const user = getState().usersState.users.find(el => el.uid === uid);

            let posts = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data, user };
            });
            for(let i=0;i<posts.length;i++)
            {
                dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
            }
            dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
        })
    })
}

export function fetchUsersFollowingLikes(uid, postId)
{
    return((dispatch, getState) => {
        firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .doc(postId)
        .collection("likes")
        .doc(auth().currentUser.uid)
        .onSnapshot((snapshot) =>
        {
            //since this is async process, we will lose the respective post ID param
            //thus, we are trying to find the post ID from the Snapshot
            const postId = snapshot.ref.path.split('/')[3];

            let currentUserLike = false;
            if(snapshot.exists)
            {
                currentUserLike = true;
            }
            
            dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike });
        })
    })
}