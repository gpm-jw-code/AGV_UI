<template>
  <i
    @click="ToggleMenu"
    v-show="showMenuToggleIcon"
    class="bi text-primary bi-list menu-toggle-icon"
  ></i>
  <SideMenuDrawer ref="side_menu"></SideMenuDrawer>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
import bus from '@/event-bus.js'
import SideMenuDrawer from '@/views/SideMenuDrawer.vue'
export default {
  components: {
    SideMenuDrawer,
  },
  data() {
    return {
      showMenuToggleIcon: false,
    }
  },
  methods: {
    ToggleMenu() {
      this.$refs.side_menu.Show();
    }
  },
  mounted() {

    document.title = "GPM AGV";

    bus.on('/god_mode_changed', (is_god_mode_now) => {
      this.showMenuToggleIcon = is_god_mode_now
    });
    if (process.env.NODE_ENV != 'production') {
      this.showMenuToggleIcon = true;
    }
    bus.on('idle', (arg) => {
      this.$router.push('/idle')
      // alert('idle 5 ^_^')
    })
  },
};
</script>

<style lang="scss">
.menu-toggle-icon {
  position: absolute;
  left: 0;
  font-size: 26px;
  cursor: pointer;
}

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body,
html {
  height: 100%;
  -webkit-user-select: none; /* Chrome, Safari, Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none;
}
</style>
