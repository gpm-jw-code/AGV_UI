<template>
  <div class="z-axis-control border p-1">
    <div
      v-show="!enabled"
      class="disable-notify text-start my-2"
    >{{$t('zaxis_control_notify_text') }}</div>
    <!-- <div class="d-flex" v-loading="!enabled" :element-loading-spinner="false"> -->
    <div class="d-flex">
      <div class="d-flex flex-column w-50">
        <div class="d-flex flex-row">
          <div class="label-item">Hardware Limited</div>
          <!-- <b-button size="sm" :disabled="!enabled">Chceked</b-button> -->
          <el-checkbox v-model="hardware_limit_enable" :disabled="!enabled"></el-checkbox>
        </div>
        <div class="d-flex flex-row my-2">
          <div class="label-item">Current Position</div>
          <el-input size="small" style="width:72px" class="py-1" center v-model="position" disabled></el-input>
        </div>
        <div v-if="true" class="p-2 my-2 border rounded">
          <ZaxisPoseSetting></ZaxisPoseSetting>
        </div>
      </div>
      <!-- <el-divider direction="vertical"></el-divider> -->
      <div class="control-buttons mx-2">
        <b-button :disabled="!enabled" size="lg" class="w-100 border mb-3" variant="light" block>
          <i class="bi bi-chevron-bar-up"></i>
          {{$t('up_limit_pose') }}
        </b-button>
        <b-button
          :disabled="!enabled"
          @click="Up()"
          size="lg"
          class="w-100 border mb-3"
          variant="light"
          block
        >
          <i class="bi bi-chevron-up"></i>
          {{$t('up') }}
        </b-button>
        <b-button
          :disabled="!enabled"
          @click="Orig()"
          size="lg"
          class="w-100 border mb-3"
          variant="light"
          block
        >
          <i style="color:rgb(0, 123, 255)" class="bi bi-house-fill"></i>
          {{$t('original') }}
        </b-button>
        <b-button
          :disabled="!enabled"
          @click="Stop()"
          size="lg"
          class="w-100 border mb-3"
          variant="light"
          block
        >
          <i style="color:rgb(255, 61, 80)" class="bi bi-stop-circle-fill"></i>
          {{$t('stop') }}
        </b-button>
        <b-button
          :disabled="!enabled"
          @click="Down()"
          size="lg"
          class="w-100 border mb-3"
          variant="light"
          block
        >
          <i class="bi bi-chevron-down"></i>
          {{$t('down') }}
        </b-button>
        <b-button :disabled="!enabled" size="lg" class="w-100 border mb-3" variant="light" block>
          <i class="bi bi-chevron-bar-down"></i>
          {{$t('down_limit_pose') }}
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import VerticalControl from '@/api/VerticalControlAPI';
import ZaxisPoseSetting from './ZaxisPoseSetting.vue';
import bus from '@/event-bus'
export default {
  components: {
    ZaxisPoseSetting,
  },
  props: {
    enabled: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      position: 0,
      hardware_limit_enable: true
    }
  },
  methods: {
    async Up() {
      var ret = await VerticalControl.Up();
    },
    async Down() {
      var ret = await VerticalControl.Down();
    },
    async Orig() {
      var ret = await VerticalControl.Orig();
    },
    async Stop() {
      var ret = await VerticalControl.Stop();
    },
    async Pose() {
      var ret = await VerticalControl.Pose(1.2);
    }
  },
  mounted() {
    bus.on('/z_axis_position', (position) => {
      this.position = position
    });
  },
}
</script>

<style scoped lang="scss">
.z-axis-control {
  width: 720px;
  .label-item {
    width: 145px;
    text-align: left;
    padding: 4px;
  }
}
.disable-notify {
  color: red;
  font-weight: bold;
}
</style>