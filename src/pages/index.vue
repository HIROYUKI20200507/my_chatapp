<template>
  <div class="md:mt-10 md:mx-52">
    <Header />
    <template v-for="(message, index) in messages">
      <!-- person - start -->
      <div
        class="flex flex-col items-center gap-2 m-3 sm:flex-row md:gap-4"
        :key="index"
      >
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
      <!-- person - end -->
    </template>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  data() {
    return {
      loginUser: {
        name: '',
        img: '',
      },
    }
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages
    },
  },
  async mounted() {
    const auth = getAuth()

    await this.$store.dispatch('chat/getMessages')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loginUser.name = user.displayName
        this.loginUser.img = auth.currentUser.photoURL
      }
    })
  },
}
</script>

<style></style>
