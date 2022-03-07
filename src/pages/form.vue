<template>
  <div>
    <div class="form-group">
      <label>ユーザ名</label>
      <input v-model="form.name" type="text" class="form-control" readonly />
    </div>
    <div class="form-group">
      <textarea v-model="form.message" rows="3" class="form-control" />
    </div>
    <a @click.prevent="submit" type="submit" class="btn btn-primary"> 投稿 </a>
    <div>
      <a @click="logout">ユーザーの切替</a>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../plugins/firebase'

export default {
  data() {
    return {
      form: {
        name: null,
        email: '',
        message: '',
        image: '',
        uid: '',
      },
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.form.name = user.displayName
        this.form.email = user.email
        this.form.image = auth.currentUser.photoURL
        this.form.uid = this.$store.state.chat.user.userId
      }
    })
  },
  methods: {
    async submit() {
      const messagesCollectionRef = collection(db, 'messages')
      addDoc(messagesCollectionRef, this.form)
      this.$router.push('/')
    },
    async logout() {
      const auth = getAuth()

      signOut(auth)
      this.$router.push('/login')
    },
  },
}
</script>

<style></style>
