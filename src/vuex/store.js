import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import firebase from 'firebase'
import axios from 'axios'
var config = {
  apiKey: 'AIzaSyA6znGWX3RPRI2ZZ1L-orkG-rYnAC8bl7I',
  authDomain: 'kaicom-98084.firebaseapp.com',
  databaseURL: 'https://kaicom-98084.firebaseio.com',
  projectId: 'kaicom-98084',
  storageBucket: 'kaicom-98084.appspot.com',
  messagingSenderId: '906356596618'
}
firebase.initializeApp(config)
const user = firebase.database().ref('user')
var provider = new firebase.auth.FacebookAuthProvider()
provider.addScope('public_profile')
provider.setCustomParameters({
  'display': 'popup'
})
const store = new Vuex.Store({
  state: {
    uid: '',
    photoURL: '',
    displayName: '',
    mode: true,
    user: [],
    stock: [],
    showPrice: {},
    admin: false,
    tag: ''
  },
  getters: {
    uid: state => { return state.uid },
    photoURL: state => { return state.photoURL },
    displayName: state => { return state.displayName },
    mode: state => { return state.mode },
    user: state => { return state.user },
    stock: state => { return state.stock },
    showPrice: state => { return state.showPrice },
    admin: state => { return state.admin },
    tag: state => { return state.tag }
  },
  actions: {
    login (context) {
      context.commit('login')
    },
    logout (context) {
      context.commit('logout')
    },
    upload (context, payload) {
      context.commit('upload', payload)
    },
    getUser (context) {
      context.commit('getUser')
    },
    getStock (context) {
      context.commit('getStock')
    },
    updateStatus (context, payload) {
      context.commit('updateStatus', payload)
    },
    comments (context, payload) {
      context.commit('comments', payload)
    },
    showPrice (context, payload) {
      context.commit('showPrice', payload)
    },
    updateComment (context, payload) {
      context.commit('updateComment', payload)
    },
    updateview (context, payload) {
      context.commit('updateview', payload)
    },
    remove (context, payload) {
      context.commit('remove', payload)
    },
    tag (context, payload) {
      context.commit('tag', payload)
    }
  },
  mutations: {
    login (state) {
      firebase.auth().signInWithPopup(provider).then(function (result) {
        var user = result.user
        // console.log(user)
        state.uid = user.uid
        state.photoURL = user.photoURL
        state.displayName = user.displayName
        state.mode = false
        axios.get('https://kaicom-98084.firebaseio.com/admin.json').then(res => {
          // if (state.uid)
          for (var index in res.data) {
            if (res.data.hasOwnProperty(index)) {
              if (state.uid === res.data[index].uid) {
                state.admin = true
                break
              } else {
                state.admin = false
              }
              console.log('admin :', state.admin)
            }
          }
        })
      })
    },
    logout (state) {
      firebase.auth().signOut().then(function () {
        state.mode = true
      })
    },
    upload (state, payload) {
      console.log('payload : ', payload)
      user.push(payload)
    },
    getUser (state) {
      axios.get('https://kaicom-98084.firebaseio.com/user.json').then((res) => {
        // state.user = res.data
        let arr = []
        for (var index in res.data) {
          if (res.data.hasOwnProperty(index)) {
            arr.push({
              ...res.data[index],
              firebaseID: index
            })
          }
        }
        state.user = arr
        console.log('start ', state.user)
        let arr2 = []
        for (var i = 0; i < state.user.length; i++) {
          if (state.uid === state.user[i].uid) {
            arr2.push(state.user[i])
            // console.log(state.user[i])
          }
        }
        state.stock = arr2
      })
    },
    getStock (state) {
      let arr = []
      for (var i = 0; i < state.user.length; i++) {
        if (state.uid === state.user[i].uid) {
          arr.push(state.user[i])
          // console.log(state.user[i])
        }
      }
      state.stock = arr
      console.log('getStock', state.stock)
    },
    updateStatus (state, payload) {
      firebase.database().ref('user/' + payload.firebaseID).update({
        ...payload
      })
      console.log(payload)
    },
    comments (state, payload) {
      // let arr = []
      let com = []
      for (var i = 0; i < state.user.length; i++) {
        if (state.user[i].firebaseID === payload.firebaseID) {
          com.push({
            photoURL: payload.photoURL,
            uid: payload.uid,
            displayName: payload.displayName,
            message: payload.text
          })
        }
      }
      console.log(com)

      // firebase.database().ref('user/' + payload.firebaseID).update({
      // })
    },
    showPrice (state, payload) {
      state.showPrice = payload
      // console.log('vuex :', state.showPrice)
    },
    updateComment (state, payload) {
      // console.log('vuex :', payload)
      firebase.database().ref('user/' + payload.firebaseID).update({
        ...payload
      })
    },
    updateview (state, payload) {
      payload.view += 1
      console.log('view : ', payload)
      firebase.database().ref('user/' + payload.firebaseID).update({
        ...payload
      })
    },
    remove (state, payload) {
      firebase.database().ref('user/' + payload.firebaseID).remove()
    },
    tag (state, payload) {
      state.tag = payload
      console.log('tag : ', state.tag)
    }
  }
})

export default store
