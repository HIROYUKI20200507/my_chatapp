<template>
  <div>
    <form>
      <div class="form-group">
        <label>ユーザ名</label>
        <input v-model="form.name" type="text" class="form-control" readonly />
      </div>
      <div class="form-group">
        <textarea v-model="form.message" rows="3" class="form-control" />
      </div>
      <button @click.prevent="submit" type="submit" class="btn btn-primary">
        投稿
      </button>
    </form>
    <div>
      <a @click="logout">ユーザーの切替</a>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      form: {
        name: null,
        message: '',
      },
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
        this.form.name = user.displayName
      }
    })
  },
  methods: {
    async submit() {
      this.$store.commit('chat/ADD_MESSAGE', this.form)
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
