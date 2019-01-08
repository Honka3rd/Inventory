import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDqRb83yyxa34j6oO59dyF5FBIO7-dDASs",
    authDomain: "inventory-19d68.firebaseapp.com",
    databaseURL: "https://inventory-19d68.firebaseio.com",
    projectId: "inventory-19d68",
    storageBucket: "inventory-19d68.appspot.com",
    messagingSenderId: "969879474157"
}

firebase.initializeApp(config);
const root = firebase.database();
const data = root.ref().child('list').child('data')
const pwd = root.ref().child('list').child('pwd')
const rootRef = [data,pwd]
export default rootRef;