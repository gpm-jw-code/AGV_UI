<template>
  <div class="battery d-flex flex-row" :style="'height:'+bHeight">
    <div v-if="showIcon">
      <i v-if="battery_status.IsCharging" style="color:green" class="bi bi-battery-charging"></i>
      <i v-else :class="'bi bi-battery-full'" :style="{color:IsLowBatteryLevel?'red':'black'}"></i>
    </div>
    <b-progress class="flex-fill h-100" :max="max" animated>
      <b-progress-bar
        animated
        v-bind:class="battery_state_bg"
        :value="battery_level"
        :label="`${((battery_level / max) * 100).toFixed(2)}%`"
        v-bind:style="{
          fontSize:bHeight=='1rem'? '12px':'16px'
        }"
      ></b-progress-bar>
    </b-progress>

    <div v-if="battery_status.IsCharging" class="charge-current px-3">
      <div>{{ $t('charging_current') }}: {{ battery_status.ChargeCurrent }} mA</div>
    </div>
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
    bHeight: {
      type: String,
      default() {
        return '1rem'
      }
    },
    showIcon: {
      type: Boolean,
      default: true
    }
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
    },
    batHeight() {
      return this.bHeight;
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
    background-color: rgb(78, 163, 255);
  }
  .charge-current {
    font-size: 11px;
    font-weight: bold;
  }
}
</style>