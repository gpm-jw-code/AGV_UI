<template>
  <div class="emo-button" @click="EMO()">
    <img src="@/assets/emo.png" width="60" />
  </div>
</template>

<script>
import { EMO } from '@/api/VMSAPI'
export default {

  methods: {
    async EMO() {
      await EMO();
    }
  },

}

</script>

<style lang="scss">
.emo-button {
  &:active {
    /* background-color: gray; */
    padding: 2px;
  }
}
/* .emo-button:active {
} */
</style>