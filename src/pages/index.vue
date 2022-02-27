<template>
  <div>
    <router-link class="btn btn-light" to="/form"> 投稿画面 </router-link>
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
            :src="getPhoto(message.image)"
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
export default {
  data() {
    return {}
  },
  computed: {
    messages() {
      return this.$store.state.chat.messages
    },
  },
  methods: {
    async getPhoto(img) {
      if (img) return img
      if (!img) {
        // TODO:デフォルト画像を挿入
        fetchSomething = () => {
          const ip = this.$axios.$get('http://api.randomuser.me/')
          this.ip = ip
          console.log(ip)
        }
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('chat/getMessages')
  },
}
</script>

<style></style>
