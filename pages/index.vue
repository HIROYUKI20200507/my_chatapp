<template>
  <div>
    <div>github actions設定</div>
    <router-link class="btn btn-light" to="/form"> 投稿画面 </router-link>
    <br /><br />
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="(message, index) in messages"
        :key="index"
      >
        <div>
          {{ message.name }}
        </div>
        <div>
          {{ message.message }}
        </div>
      </li>
    </ul>
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
  async mounted() {
    await this.$store.dispatch('chat/getMessages')
  },
}
</script>

<style></style>
