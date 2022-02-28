<template>
  <header class="flex justify-between items-center py-4 md:py-8">
    <!-- logo - start -->
    <a
      href="/"
      class="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
      aria-label="logo"
    >
      <svg
        width="95"
        height="94"
        viewBox="0 0 95 94"
        class="w-6 h-auto text-indigo-500"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M96 0V47L48 94H0V47L48 0H96Z" />
      </svg>

      chat app
    </a>
    <!-- logo - end -->

    <!-- nav - start -->
    <nav class="hidden lg:flex gap-12">
      <router-link
        to="/"
        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
        >Home</router-link
      >
      <router-link
        to="/form"
        class="inline-flex items-center text-indigo-500 text-lg font-semibold gap-1"
      >
        form

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
      <a
        href="#"
        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
        >Pricing</a
      >
      <a
        href="#"
        class="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
        >About</a
      >
    </nav>
    <!-- nav - end -->

    <!-- buttons - start -->
    <div class="flex items-center gap-5">
      <div class="w-8 h-8 bg-gray-100 rounded-full overflow-hidden shadow-lg">
        <img
          :src="loginUser.userImg"
          class="w-full h-full object-cover object-center"
        />
      </div>
      <div
        class="text-indigo-500 md:text-lg font-bold text-center sm:text-left"
      >
        <router-link to="/profile"> {{ loginUser.name }} </router-link>
      </div>
    </div>

    <button
      type="button"
      class="inline-flex items-center lg:hidden bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold rounded-lg gap-2 px-2.5 py-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clip-rule="evenodd"
        />
      </svg>

      Menu
    </button>
    <!-- buttons - end -->
  </header>
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
