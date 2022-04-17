<template>
  <v-app id="inspire">
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>

    <Header />

    <v-main>
      <v-container class="px-6 py-8" fluid>
        <v-row>
          <v-col v-for="(message, index) in getMessages" :key="index" cols="12">
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <v-list-item>
                  <v-list-item-avatar color="grey darken-1">
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ message }}</v-list-item-title>

                    <v-list-item-subtitle>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Nihil repellendus distinctio similique
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <!-- <template v-for="(message, index) in getMessages">
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
          @click="messageDelete(message.id)"
        >
          delete
        </button>
      </div>
    </template>
    <div class="w-full">
      <div class="flex items-center w-full py-2 border-b border-teal-500">
        <input
          class="w-full px-2 py-1 mr-3 leading-tight text-gray-700 bg-transparent border-none appearance-none focus:outline-none"
          type="text"
          v-model="form.message"
          placeholder="投稿内容はこちらに記述してください"
          aria-label="Full name"
        />
        <button
          class="flex-shrink-0 px-2 py-1 text-sm text-white bg-teal-500 border-4 border-teal-500 rounded hover:bg-teal-700 hover:border-teal-700"
          type="button"
          @click.prevent="submit"
        >
          投稿
        </button>
      </div>
    </div>
    <div class="flex justify-end mt-10">
      <a
        class="px-4 py-2 font-semibold text-blue-700 bg-transparent border border-blue-500 rounded cursor-pointer hover:bg-blue-500 hover:text-white hover:border-transparent"
        @click="logout"
        >ログアウト</a
      >
    </div>
  </div> -->
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  query,
  doc,
  deleteDoc,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { db } from '../plugins/firebase'

export default {
  data() {
    return {
      cards: ['Today', 'Yesterday'],
      getMessages: [],
      loginUser: {
        name: '',
        img: '',
      },
      form: {
        name: null,
        email: '',
        message: '',
        image: '',
        uid: '',
      },
    }
  },
  async mounted() {
    const auth = getAuth()

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.form.name = user.displayName
        this.form.email = user.email
        this.form.image = auth.currentUser.photoURL
        this.form.uid = this.$store.state.chat.user.userId
      }
    })

    await this.$store.dispatch('chat/getMessages')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loginUser.name = user.displayName
        this.loginUser.img = auth.currentUser.photoURL
      }
    })

    this.getFirebaseDbMessages()
  },
  methods: {
    async submit() {
      const messagesCollectionRef = collection(db, 'messages')
      addDoc(messagesCollectionRef, this.form)

      await this.getFirebaseDbMessages()
    },
    async logout() {
      const auth = getAuth()
      signOut(auth)
      this.$router.push('/login')
    },
    async getFirebaseDbMessages() {
      const name = this.$store.state.chat.user.userName
      const email = this.$store.state.chat.user.userEmail
      const q = query(collection(db, 'messages'))
      const querySnapshot = await getDocs(q)
      this.getMessages = []

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
    },
    async messageDelete(id) {
      this.getMessages = []

      await deleteDoc(doc(db, 'messages', id))
      await this.getFirebaseDbMessages()
    },
  },
}
</script>

<style></style>
