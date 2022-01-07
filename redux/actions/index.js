import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { USER_STATE_CHANGE } from '../constants/index';

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
                dispatch({type:USER_STATE_CHANGE, currentUser: snapshot.data()});
            }
            else
            {
                console.log("User doesn't exist");
            }
        })
    })
}