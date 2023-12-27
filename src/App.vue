<template>
  <nav class="nav-bar">
    <div class="title">title</div>
    <div class="choices">
      <div>elem-1</div>
      <div>elem-1</div>
      <div>elem-1</div>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  width: 15%;
  font-size: 20px;
}
.choices {
  display: flex;
  justify-content: space-around;
  width: 40%;
}
</style>
