<template>
    <body>
      <div class="body-container">
        <div class="info">
            info about user
            <div class="elem-1" v-if="showUser">
                {{ displayedUser.username }}
                <br>
                {{ displayedUser.description }}
                <br>
                <ul>
                  <li v-for="(achievement, id) in displayedUser.achievements" :key="id">
                    {{ achievement.achivment.name }} - {{ achievement.achivment.description }}
                  </li>
                </ul>
            </div>
        </div>
  
  
        <div class="chat-container">
          <div class="messages">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="message.whos_message ? 'my-message' : 'message'"
            >
              <span class="author" @click="showUserData(message.user_display)">{{ message.name }}</span>
              <br />
              {{ message.text }}
            </div>
          </div>
          <div class="input-container">
            <input type="text" class="message-input" v-model="text_message" />
            <button class="send-button" v-on:click="sendMessage">send</button>
          </div>
        </div>
  
  
        <div class="elem-3">elem3</div>
      </div>
    </body>
  </template>

<script>
import axios from 'axios'

export default {
    mounted() {
        this.getId()
        this.getMessage()
        this.getUser()
    },
    data() {
        return {
            user_id: '',
            id: '',
            messages: [],
            text_message: '',
            showUser: false,
            displayedUser: {}
        }
    },
    methods: {
        getId() {
            this.id = this.$route.params.id
        },
        getMessage() {
            const token = localStorage.getItem("token");
            axios.get('http://localhost:8000/message/?chatid='+ this.id, {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                this.messages = res.data
            })
        },
        getUser() {
            const token = localStorage.getItem("token");
            console.log(token);
            if (token) {
              axios
                .get("http://127.0.0.1:8000/auth/users/me/", {
                headers: {
                    Authorization: `Token ${token}`,
                },
                })
                .then((res) => {
                console.log(res.data.id);
                this.user_id = res.data.id;
                })
                .catch((error) => {
                console.error("Error fetching user:", error);
                });
            }
    },
        sendMessage() {
            if (!this.user_id) {
                console.error("User ID not available. Unable to send message.");
                return;
            }


            const token = localStorage.getItem("token");
            axios
                .post(
                "http://127.0.0.1:8000/message/",
                {
                    text: this.text_message,
                    user: this.user_id,
                    chat: this.id

                },
                {
                    headers: {
                    Authorization: `Token ${token}`,
                    },
                }
                )
                .then((res) =>{
                    console.log(res.data)
                    this.text_message = ''
                })
                .catch((error) => {
                console.error("Error sending message:", error);
                });
        },
        showUserData(userData) {
            this.showUser = !this.showUser
            this.displayedUser = userData
            console.log(userData)
        }
    }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}


.body-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: white;
}


.info {
  background-color: #00000077;
  height: 20%;
  width: 15%;
}

.elem-1 {
    color: #ffd5009f;
}
.chat-container {
  display: flex;
  flex-direction: column;
  background-color:grey;
  width: 40%;
  height: 90%;
}


.elem-3 {
  background-color: aqua;
}


.messages {
  height: 93%;
  background-color: #00000077;
  overflow-y: auto;
  display: flex;
  flex-direction: column; /* Align messages to the bottom */
  justify-content: flex-start;
}


.message {
  background-color: #b1bbc146;
  color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: start;
}
.my-message {
  background-color: rgba(99, 104, 106, 0.368);
  color: #fff;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  font-size: 12px;
  text-align: end;
}


.input-container {
  display: flex;
  background-color: #80808078;
  height: 7%;
  align-items: center;
}
.message-input {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  font-size: 10px;
}


.send-button {
  padding: 8px 15px;
  background-color: #00000077;
  color: yellow;
  cursor: pointer;
  font-size: 10px;
    border: none;
}


.author {
  font-weight: bold;
  margin-right: 5px;
  color: #ffd5009f;
}
</style>


