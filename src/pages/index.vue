<template>
  <div class="md:mt-10 md:mx-52">
    <Header />
    <template v-for="(message, index) in getMessages">
      <!-- person - start -->
      <div
        class="flex flex-col items-center justify-between px-5 py-3 m-3 border border-gray-400 shadow sm:flex-row md:gap-4"
        :key="index"
      >
        <div class="flex items-center gap-5">
          <div
            class="w-16 h-16 overflow-hidden bg-gray-100 rounded-full shadow-lg"
          >
            <img
              :src="message.image"
              loading="lazy"
              alt="Photo by christian ferrer"
              class="object-cover object-center w-full h-full"
            />
          </div>
          <div>
            <div
              class="font-bold text-center text-indigo-500 md:text-lg sm:text-left"
            >
              {{ message.name }}
            </div>
            <p
              class="text-sm text-center text-gray-500 md:text-base sm:text-left"
            >
              {{ message.message }}
            </p>
          </div>
        </div>
        <button
          class="px-4 py-2 font-semibold text-gray-800 bg-white border border-gray-400 rounded shadow hover:bg-gray-100"
          @click="messageDelete"
        >
          delete
        </button>
      </div>
      <!-- person - end -->
    </template>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, doc, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from '../plugins/firebase'

export default {
  data() {
    return {
      getMessages: [],
      loginUser: {
        name: '',
        img: '',
      },
    }
  },
  async mounted() {
    const name = this.$store.state.chat.user.userName
    const email = this.$store.state.chat.user.userEmail
    const q = query(collection(db, 'messages'))

    const querySnapshot = await getDocs(q)
    await querySnapshot.forEach((doc) => {
      if (doc.data().name === name && doc.data().email === email) {
        const getChatData = {
          name: doc.data().name,
          image: doc.data().image,
          email: doc.data().email,
          message: doc.data().message,
          id: doc.id,
        }
        this.getMessages.push(getChatData)
      }
    })

    const auth = getAuth()
    await this.$store.dispatch('chat/getMessages')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loginUser.name = user.displayName
        this.loginUser.img = auth.currentUser.photoURL
      }
    })
  },
  methods: {
    messageDelete() {},
  },
}
</script>

<style></style>
