<template>
  <body>
    <div class="about">
      chinase copy of reddit
    </div>
    <div class="chats">
      <div v-for="chat in chats" :key="chat.id" class="chat">
        <img :src="chat.image" alt="">
        <router-link :to="{name: 'chat', params: {id: chat.id}}" class="link">{{ chat.name }}</router-link>
      </div>
    </div>
    <div>
      created by:
      egor, katja
    </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      chats: []
    }
  },
  mounted() {
    this.getChat()
  },
  methods: {
    getChat() {
      axios.get('http://127.0.0.1:8000/chat/').
      then((res) => {
        this.chats = res.data
    })
    },
  }
}

</script>

<style scoped>

template {
  height: 100%;
}
body {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.chats {
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: grey;
  justify-content: center;
}

.chat {
  padding: 10px;
  text-align: center;
  margin-left: 20px;
  margin-right: 20px;

}
</style>
