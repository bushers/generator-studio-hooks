declare let firebase;

/**
 * Firebase keys and api configs
 */
export const FIREBASE_CONF = {
    apiKey: 'AIzaSyBRcF9V1_fHz0EXcDJsHY0XkzASLFibWgE',
    authDomain: 'female-protagonists.firebaseapp.com',
    databaseURL: 'https://female-protagonists.firebaseio.com',
    projectId: 'female-protagonists',
    storageBucket: 'female-protagonists.appspot.com',
    messagingSenderId: '474915954510',
    appId: '1:474915954510:web:732a644231f6840027481f',
};

export default !firebase.apps.length ? firebase.initializeApp(FIREBASE_CONF) : firebase.app();
