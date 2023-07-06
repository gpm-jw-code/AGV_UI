<template>
  <div class="w-100">
    <div v-if="IsE84UseEmu" class="p-1 text-danger">模擬模式!</div>
    <div v-if="!IsUserLogin" class="p-1 text-danger">登入後可手動變更AGV 交握訊號</div>
    <div class="d-flex flex-column px-1" v-if="IsGodUse" style="float: left;">
      <b-button @click="show_hs_test_drawer=true" class="my-1" variant="primary">交握測試</b-button>
    </div>
    <div class="d-flex justify-content-center">
      <DJM_PIO Owner="AGV"></DJM_PIO>
      <DJM_PIO Owner="EQ"></DJM_PIO>
    </div>

    <el-drawer direction="btt" v-model="show_hs_test_drawer">
      <b-button class="my-1" variant="danger">正常流程測試</b-button>
      <b-button class="my-1" variant="danger">EQ異常模擬</b-button>
    </el-drawer>
  </div>
</template>

<script>
import DJM_PIO from './DJM_PIO.vue';
import { UserStore, DIOStore, AGVStatusStore } from '@/store'
export default {
  components: {
    DJM_PIO,
  },
  data() {
    return {
      show_hs_test_drawer: false
    }
  },
  computed: {
    IsGodUse() {
      return UserStore.getters.IsGodUser;
    },
    IsUserLogin() {
      return UserStore.getters.CurrentUserRole != 0
    },
    IsE84UseEmu() {
      return DIOStore.getters.IsE84UseEmu
    }
  },
}
</script>

<style lang="scss" scoped>
</style>