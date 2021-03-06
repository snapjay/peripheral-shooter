'use strict'
import firebase from 'firebase'
import 'firebase/firestore'
import {genCode} from '@/services/utils'

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
    this.collectionGame = 'games'
    this.collectionShots = 'shots'
  }

  updateGame (gameId, settings) {
    return this.getDB().collection(this.collectionGame).doc(gameId).update(settings)
  }

  createGame (code) {
    if (!code) code = genCode()
    return this.getDB().collection(this.collectionGame).add({
      code,
      shotLimit: 10,
      range: {
        from: 1,
        to: 5,
      },
      meta: {},
      update: 2000,
      hide: 1000,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  addShot (gameId, screen, content, meta = {}) {
    return this.getDB().collection(this.collectionGame).doc(gameId).collection(this.collectionShots).add({
      screen,
      content,
      meta,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  listenShots (gameId, callback) {
    this.getDB().collection(this.collectionGame).doc(gameId).collection(this.collectionShots).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let shots = []
      querySnapshot.forEach((doc) => {
        if (!doc.metadata.hasPendingWrites) {
          shots.push(doc.data())
        }
      })
      callback(shots)
    })
  }

  listenGame (gameId, callback) {
    this.getDB().collection(this.collectionGame).doc(gameId).onSnapshot((doc) => {
      callback(doc)
    })
  }

  listenScreen (gameId, screen, callback) {
    this.getDB().collection(this.collectionGame).doc(gameId).collection(this.collectionShots).where('screen', '==', screen).limit(1).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let content = ''
      let meta = {}
      if (querySnapshot.docs.length) {
        content = querySnapshot.docs[0].get('content')
        meta = querySnapshot.docs[0].get('meta')
      }
      callback(content, meta, querySnapshot)
    })
  }

  listenGames (callback) {
    this.getDB().collection(this.collectionGame).limit(30).orderBy('created', 'desc').onSnapshot((querySnapshot) => {
      let games = []
      querySnapshot.forEach((doc) => {
        let row = doc.data()
        row.id = doc.id
        games.push(row)
      })
      callback(games)
    })
  }

  deleteShots (gameId) {
    this.getDB().collection(this.collectionGame).doc(gameId).collection(this.collectionShots).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.getDB().collection(this.collectionGame).doc(gameId).collection(this.collectionShots).doc(doc.id).delete()
      })
    })
  }

  getDB () {
    return this.db
  }
}

export default new Firebase()
