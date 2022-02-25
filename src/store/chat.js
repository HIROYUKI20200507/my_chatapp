import { collection, getDocs } from 'firebase/firestore'
import { db } from '../plugins/firebase'

export const state = () => {
  return {
    messages: [],
  }
}

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.unshift(message)
  },
  LOAD_MESSAGE(state, messages) {
    state.messages = messages
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
}
