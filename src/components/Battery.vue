<template>
  <div class="battery d-flex flex-row">
    <i v-if="battery_status.IsCharging" style="color:green" class="bi bi-battery-charging"></i>
    <i v-else :class="'bi bi-battery-full'" :style="{color:IsLowBatteryLevel?'red':'black'}"></i>
    <b-progress class="flex-fill" :max="max" animated>
      <b-progress-bar
        animated
        v-bind:class="battery_state_bg"
        :value="battery_level"
        :label="`${((battery_level / max) * 100).toFixed(2)}%`"
      ></b-progress-bar>
    </b-progress>
  </div>
  <div v-if="battery_status.IsCharging" class="d-flex flex-row float-right">
    <div>{{ $t('charging_current') }}:</div>
    <div>{{ battery_status.ChargeCurrent }}</div>
  </div>
</template>

<script>
import { GetBatteryState } from '@/api/VMSAPI';
import bus from '@/event-bus.js'
import BatteryStatus from '@/ViewModels/BatteryStatus';
export default {
  data() {
    return {
      max: 100,
      battery_status: new BatteryStatus()
    }
  },
  props: {
    Warning_Up_limit: {
      type: Number,
      default: 45
    },
    Warning_DOwn_limit: {
      type: Number,
      default: 20
    },

  },
  computed: {
    battery_level() {
      return this.battery_status.BatteryLevel;
    },
    battery_state_bg() {
      if (this.battery_status.IsCharging)
        return "full-state"

      if (this.battery_level > this.Warning_Up_limit)
        return "full-state"
      if (this.battery_level <= this.Warning_Up_limit && this.battery_level >= this.Warning_DOwn_limit)
        return "bg-warning"
      else
        return "bg-danger"
    },
    IsLowBatteryLevel() {
      return this.battery_level < this.Warning_DOwn_limit
    }
  },
  mounted() {
    // setInterval(async () => {
    //   var betteryState = await GetBatteryState();
    //   this.value = betteryState.batteryLevel;
    // }, 1000);

    bus.on('/battery', (battery_status) => {
      this.battery_status = battery_status
    })
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
  .full-state {
    background-color: rgb(13, 110, 253);
  }
}
</style>