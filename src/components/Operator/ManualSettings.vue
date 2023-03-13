<template>
  <div class="manual_settings border px-3 mx-3">
    <div class="d-flex flex-row py-3">
      <div class="item-label">Laser Mode</div>
      <div>
        <b-input-group>
          <b-form-input :disabled="!enabled" v-model="laser_mode" type="number" min="0"></b-form-input>
          <div class="updown-btns">
            <b-input-group-append>
              <b-button :disabled="!enabled" squared @click="LaserMode_Increase">▲</b-button>
            </b-input-group-append>
            <b-input-group-prepend>
              <b-button :disabled="!enabled" squared @click="LaserMode_decrease">▼</b-button>
            </b-input-group-prepend>
          </div>
        </b-input-group>
      </div>
      <b-button
        @click="modifyLaserModeDialogShow=true"
        :disabled="!enabled"
        squared
        class="mx-1"
        variant="danger"
      >Modify</b-button>
    </div>

    <b-modal
      v-model="modifyLaserModeDialogShow"
      :centered="true"
      title="Laser Mode Change"
      @ok="ModifyLaserMode"
    >
      <p>Change Laser Mode to : {{laser_mode }}</p>
      <p>Are you sure?</p>
    </b-modal>
  </div>
</template>

<script>
import { LaserMode } from '@/api/VMSAPI.js'
import Notifier from '@/api/NotifyHelper';
export default {
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      laser_mode: 0,
      modifyLaserModeDialogShow: false

    }
  },
  methods: {
    LaserMode_Increase() {
      this.laser_mode++;
    },
    LaserMode_decrease() {
      if (this.laser_mode == 0)
        return;
      this.laser_mode--;
    },
    async ModifyLaserMode() {
      await LaserMode(this.laser_mode);
      Notifier.Success(`Lasr mode changed:${this.laser_mode}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.manual_settings {
  height: 400px;
  .item-label {
    width: 130px;
    font-size: 20px;
    text-align: left;
    padding: 5px;
  }
  .updown-btns {
    button {
      height: 22px;
      font-size: small;
      text-align: center;
      padding: 0px;
      width: 43px;
      border: 1px solid black;
    }
  }
}
</style>