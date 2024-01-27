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

      <div class="chat-container" id="chat-container">
        <div class="messages" id="messages" ref="messagesContainer">
          
          <div
            v-for="message in messages"
            :key="message.id"
            class="message"
          >
            <span class="author" @click="showUserData(message.user_display)">{{ message.user_display.username}}</span>
            <span class="terminalName">@{{ message.user_display.terminalName}}:$ ~ </span>
            {{ message.text }}
          </div>
          
          <div class="message input">
            <span class="author">{{ user_data['username'] }}</span>
            <span class="terminalName"> {{ user_data['terminalName'] }}</span>
            <input type="text" class="message-input" v-model="text_message"  @keydown.enter="sendMessage()"/>
          </div>

        </div>
      </div>


      <div class="elem-3">elem3</div>
    </div>
  </body>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
    this.getMessage();
    this.getUser();
    this.timer = setInterval(this.getMessage, 5000);

    this.$refs.messagesContainer.addEventListener('scroll', this.handleScroll);
  },
  data() {
    return {
      chat_id: this.$route.params.id,
      messages: [],
      text_message: '',
      showUser: false,
      displayedUser: {},
      timer: '',
      user_data: {},
      page: 1,
      loadingMore: false

    };
  },
  methods: {

    handleScroll() {
      const container = this.$refs.messagesContainer;

      // Check if the user has scrolled to the top
      const isAtTop = container.scrollTop === 0;

      if (isAtTop && !this.loadingMore) {
        // Load more data only if not already loading
        this.loadMoreData();
      }
    },

    loadMoreData() {
      this.page = this.page + 1
      // Set loadingMore to true to prevent multiple simultaneous requests
      this.loadingMore = true;

      // Implement your logic to load more data
      const token = localStorage.getItem('token');
      const apiUrl = `http://localhost:8000/message/?chatid=${this.chat_id}&page=${this.page}`;

      const config = token ? { headers: { Authorization: `Token ${token}` } } : {};

      axios
        .get(apiUrl, config)
        .then((res) => {
          // Append the new messages to the existing ones
          this.messages = [...this.messages, ...res.data.results];
          this.loadingMore = false;
        })
        .catch((error) => {
          console.error('Error fetching more messages:', error);
          this.loadingMore = false;
        });
    },

    scrollToBottom() {
      // Ensure that the container and its properties are available
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    getMessage() {
      const token = localStorage.getItem('token');
      const apiUrl = 'http://localhost:8000/message/?chatid=' + this.chat_id;

      const config = token ? { headers: { Authorization: `Token ${token}` } } : {};

      axios
        .get(apiUrl, config)
        .then((res) => {
          this.messages = res.data.results;
          this.messages.reverse()
          const url = (res.data.next)
          console.log(url[url.leng])
          this.$nextTick(() => {
            this.scrollToBottom()
          })
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        });
    },
    getUser() {
      const token = localStorage.getItem('token');
      if (token) {
        axios
          .get('http://127.0.0.1:8000/auth/users/me/', {
            headers: {
              Authorization: `Token ${token}`,
            },
          })
          .then((res) => {
            this.user_data = {username: res.data.username, terminalName: res.data.terminalName, userId: res.data.id}
          })
          .catch((error) => {
            console.error('Error fetching user:', error);
          });
      }
    },
    sendMessage() {
      if (!this.user_data['userId']) {
        console.error('User ID not available. Unable to send message.');
        return;
      }

      const token = localStorage.getItem('token');
      axios
        .post(
          'http://127.0.0.1:8000/message/',
          {
            text: this.text_message,
            user: this.user_data['userId'],
            chat: this.chat_id,
          },
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.text_message = '';
          this.getMessage(); // Fetch messages after sending a new one
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    },
    showUserData(userData) {
      this.showUser = !this.showUser;
      this.displayedUser = userData;
    },
  },
};
</script>


<style scoped>

@font-face {
  font-family: Fallout;
  src: url(D:\python\web\cybersan\cybersan-frontend\public\monofonto.zip);
}

body {
  margin: 0;
  padding: 0;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #fefefe; /* Light background color */
}

.body-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  background-color: #fefefe;
}

.info {
  background-color: #00000077;
  height: 20%;
  width: 15%;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Box shadow for a bit of depth */
}

.elem-1 {
  color: #ffd5009f;
}

.chat-container {
  display: flex;
  flex-direction: column;
  background-color: #413b3b; /* Light grey background */
  width: 40%;
  height: 90%;
  border: 2px solid #00000077; /* Black border */
  border-radius: 10px; /* Rounded corners */
  overflow: hidden; /* Hide overflowing content */
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5); /* Box shadow for a bit of depth */
}

.elem-3 {
  background-color: #3498db; /* Blue color for elem-3 */
  border-radius: 5px; /* Rounded corners */
  padding: 10px;
  margin-top: 10px;
  color: white;
}

.messages {
  height: 93%;
  background-color: #5a4e4e;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 10px; /* Add some padding inside the messages container */
}

.message {
 /* Red color for messages */
  color: #d39a1e;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  font-size: 14px; /* Slightly larger font size */
  text-align: end;
}

.message-input {
  color: #d39a1e;
  background-color: #5a4e4e0a;
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  font-size: 14px;
  border: 0;
}

.message-input:focus {
  outline: none;
}

.author {
  font-weight: bold;
  margin-right: 5px;
  color: #ff62009f;
}

.terminalName {
  color: aqua;
}

</style>


