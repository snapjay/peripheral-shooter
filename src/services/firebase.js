'use strict'
import firebase from 'firebase'
import 'firebase/firestore'

const Firebase = class {
  constructor () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAaoq1xQx0nFCYuKsUFSEjoCciThtbhBA0',
      authDomain: 'peripheral-shooter-87c31.firebaseapp.com',
      projectId: 'peripheral-shooter-87c31',
      // databaseURL: 'https://peripheral-shooter-87c31.firebaseio.com',
      // storageBucket: 'peripheral-shooter-87c31.appspot.com',
      // messagingSenderId: '447871794333'
    })
    this.db = firebase.firestore()
    this.collectionPath = 'round'
  }

  addRow (screen, content, style = {}) {
    return this.db.collection(this.collectionPath).add({
      screen,
      content,
      style,
      created: firebase.firestore.Timestamp.fromDate(new Date()),
    })
  }

  listenScreen (screen, callback) {
    this.getDB().collection(this.collectionPath).where('screen', '==', screen).limit(1).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let content = ''
      let style = {}
      if (querySnapshot.docs.length) {
        content = querySnapshot.docs[0].get('content')
        style = querySnapshot.docs[0].get('style')
      }
      callback(content, style, querySnapshot)
    })
  }

  getDB () {
    return this.db
  }
}

export default new Firebase()
