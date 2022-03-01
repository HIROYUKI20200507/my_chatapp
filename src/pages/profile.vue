<template>
  <div class="mt-10 mx-52">
    <Header />
    <section class="text-gray-600 body-font">
      <div class="flex flex-col items-center justify-center px-5 py-24 mx-auto">
        <img
          class="object-cover object-center w-5/6 mb-10 rounded lg:w-2/6 md:w-3/6"
          alt="hero"
          :src="loginUser.img"
        />
        <div class="w-full text-center lg:w-2/3">
          <h1
            class="mb-4 text-3xl font-medium text-gray-900 title-font sm:text-4xl"
          >
            profile data
          </h1>
          <div class="flex items-center justify-center gap-12 my-8">
            <div class="text-2xl font-medium text-gray-500 leadixlng-relaxed">
              name
            </div>
            <input
              type="text"
              name=""
              readonly
              id="userName"
              :value="loginUser.name"
            />
            <button
              class="inline-flex px-3 py-1 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600"
            >
              編集
            </button>
          </div>
          <div class="flex justify-center">
            <button
              class="inline-flex px-6 py-2 ml-4 text-lg text-gray-700 bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

export default {
  data() {
    return {
      loginUser: {
        name: '',
        img: '',
      },
    }
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
