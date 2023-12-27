<template>
  <body> 
      <div class="body-container">
          <div class="elem-1">elem1</div>

          <div class="chat-container">
            <div class="messages">
              <div v-for="message in messages" :key="message.user" :class="message.whos_message ? 'my-message' : 'message'">
                {{ message.name }}
                <br>
                {{ message.message }}
              </div>
            </div>
            <div class="input-container">
              <input type="text" class="message-input" v-model="message">
              <button class="send-button" v-on:click="sendMessage">send</button>
            </div>
          </div>

          <div class="elem-3">elem3</div>
      </div>
  </body>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      messages: [],
      message: "",
      user_id: null,
    };
  },
  mounted() {
    console.log("mounted");
    this.getUser(); // Fetch user information on component mount
    this.getMessages();
  },
  methods: {
    getMessages() {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:8000/", {headers: {Authorization: `Token ${token}`}}).then((res) => {
        this.messages = res.data;
      });
    },
    getUser() {
      const token = localStorage.getItem("token");
      console.log(token)
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
    },
    sendMessage() {
      if (!this.user_id) {
        console.error("User ID not available. Unable to send message.");
        return;
      }

      const token = localStorage.getItem("token");
      axios
        .post(
          "http://127.0.0.1:8000/",
          {
            message: this.message,
            user: this.user_id,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then(() => {
          this.getMessages();
          this.message = "";
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    },
  },
};
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
            background-color: brown;


        }

        .elem-1 {
            background-color: blanchedalmond;
        }
        .chat-container {
            display: flex;
            flex-direction: column;
            background-color: grey;
            width: 40%;
            height: 90%;
            padding: 10px;
        }

        .elem-3 {
            background-color: aqua;
        }

        .messages {
          height: 93%;
          background-color: rgba(0, 0, 0, 0.467);
          overflow-y: auto;
          display: flex;
          flex-direction: column; /* Align messages to the bottom */
          justify-content: flex-start
        }

        .message {
          background-color: #b1bbc146;
          color: #fff;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          font-size: 12px;
          align-self: flex-start;
        }
        .my-message {
          background-color: #3487bb46;
          color: #fff;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 5px;
          font-size: 12px;
          align-self: flex-end;
        } 

        .input-container {
            display: flex;
            background-color:rgba(128, 128, 128, 0.471);
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
            background-color: #2ecc71;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            font-size: 10px;
        }

        .message .author {
            font-weight: bold;
            margin-right: 5px;
    }
</style>