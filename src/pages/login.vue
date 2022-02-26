<template>
  <div>
    <a class="text-3xl underline" @click="login"> ログイン </a>
  </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export default {
  data() {
    return {}
  },
  methods: {
    async login() {
      const provider = new GoogleAuthProvider()
      const auth = getAuth()

      await signInWithPopup(auth, provider)
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
