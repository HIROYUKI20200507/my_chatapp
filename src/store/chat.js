import { collection, getDocs } from 'firebase/firestore'
import { db } from '../plugins/firebase'
import { GoogleAuthProvider } from 'firebase/auth'

const googleProvider = new GoogleAuthProvider()

export const state = () => {
  return {
    messages: [],
    user: {
      userName: '',
      userEmail: '',
      userId: '',
    },
  }
}

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.unshift(message)
  },
  LOAD_MESSAGE(state, messages) {
    state.messages = messages
  },
  SET_USER(state, loginUser) {
    state.user = loginUser
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
  setUser({ commit }, loginUser) {
    commit('SET_USER', loginUser)
  },
}

// TODO:Vuexでストアの管理が常時できるようになったら実装
export const getters = {
  isAuthenticated(state) {
    return !!state.user.userId
  },
}
