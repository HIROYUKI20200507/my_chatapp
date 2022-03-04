import { collection, getDocs } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { GoogleAuthProvider } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const state = () => {
  return {
    messages: [],
    usr: '',
  }
}

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.unshift(message)
  },
  LOAD_MESSAGE(state, messages) {
    state.messages = messages
  },
  SET_USER(state, payload) {
    state.user = payload
  },
}

export const actions = {
  async getMessages({ commit }) {
    const querySnapshot = await getDocs(collection(db, 'messages'))
    const message = []

    await querySnapshot.forEach((doc) => {
      message.push(doc.data())
    })
    commit('LOAD_MESSAGE', message)
  },
  login() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithRedirect(googleProvider)
        .then(() => resolve())
        .catch((err) => reject(err))
    })
  },
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },
}

// TODO:Vuexでストアの管理が常時できるようになったら実装
export const getters = {
  isAuthenticated(state) {
    return !!state.user
  },
}
