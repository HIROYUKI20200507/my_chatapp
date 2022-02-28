<template>
  <div class="mt-10 mx-52">
    <Header />
    <template v-for="(message, index) in messages">
      <!-- person - start -->
      <div
        class="flex flex-col sm:flex-row items-center gap-2 md:gap-4 m-3"
        :key="index"
      >
        <div
          class="w-16 h-16 bg-gray-100 rounded-full overflow-hidden shadow-lg"
        >
          <img
            :src="message.image"
            loading="lazy"
            alt="Photo by christian ferrer"
            class="w-full h-full object-cover object-center"
          />
        </div>
        <div>
          <div
            class="text-indigo-500 md:text-lg font-bold text-center sm:text-left"
          >
            {{ message.name }}
          </div>
          <p
            class="text-gray-500 text-sm md:text-base text-center sm:text-left"
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
        userImg: '',
      },
    }
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages
    },
  },
  methods: {},
  async mounted() {
    const auth = getAuth()

    await this.$store.dispatch('chat/getMessages')
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loginUser.name = user.displayName
        this.loginUser.userImg = auth.currentUser.photoURL
      }
    })
  },
}
</script>

<style></style>
