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
    this.collectionPath = 'racers'
  }

  addRow () {
    return this.db.collection(this.collectionPath).add({
      name: 'Eli Tomac',
      bike: 'Kawasaki',
      number: 3,
      450: true,
      created_on: firebase.firestore.Timestamp.fromDate(new Date()),
    })
  }

  listenUsers (callback) {
    this.getDB().collection(this.collectionPath).onSnapshot((querySnapshot) => {
      callback(querySnapshot)
    })
  }

  getDB () {
    return this.db
  }
}

export default new Firebase()
