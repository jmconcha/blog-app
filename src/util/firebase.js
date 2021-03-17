import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import config from './firebase.config';

firebase.initializeApp(config);
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storageRef = firebase.storage().ref();
export const imagesUrl = 'https://firebasestorage.googleapis.com/v0/b/blog-app-211e7.appspot.com/o/images%2F';

export default firebase;