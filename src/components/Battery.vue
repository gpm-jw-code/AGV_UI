<template>
  <div class="battery d-flex flex-row">
    <i class="bi bi-battery-full"></i>
    <b-progress class="flex-fill" :max="max" animated>
      <b-progress-bar :value="value" :label="`${((value / max) * 100).toFixed(2)}%`"></b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
import { GetBatteryState } from '@/api/AGVS';
export default {
  data() {
    return {
      max: 100,
      value: 60
    }
  },

  mounted() {
    setInterval(async () => {
      var betteryState = await GetBatteryState();
      this.value = betteryState.batteryLevel;
    }, 1000);
  },

}
</script>

<style scoped lang="scss">
.battery {
  i {
    font-size: 1.5rem;
    position: relative;
    top: -11px;
    margin-right: 4px;
  }
}
</style>