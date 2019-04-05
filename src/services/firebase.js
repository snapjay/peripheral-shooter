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

  addRow (screen, content, meta = {}) {
    return this.db.collection(this.collectionPath).add({
      screen,
      content,
      meta,
      created: firebase.firestore.Timestamp.fromDate(new Date()),
    })
  }

  getRounds (callback) {
    this.getDB().collection(this.collectionPath).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let rounds = []
      querySnapshot.forEach((doc) => {
        rounds.push(doc.data())
      })
      callback(rounds)
    })
  }

  listenScreen (screen, callback) {
    this.getDB().collection(this.collectionPath).where('screen', '==', screen).limit(1).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let content = ''
      let meta = {}
      if (querySnapshot.docs.length) {
        content = querySnapshot.docs[0].get('content')
        meta = querySnapshot.docs[0].get('meta')
      }
      callback(content, meta, querySnapshot)
    })
  }

  getDB () {
    return this.db
  }
}

export default new Firebase()
