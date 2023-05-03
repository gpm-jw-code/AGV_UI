<template>
  <div class="manual_settings border px-3 mx-3">
    <div class="d-flex flex-row py-3">
      <div class="item-label">Laser Mode</div>
      <div>
        <b-input-group>
          <b-form-input
            size="lg"
            class="centered-text"
            :disabled="!enabled"
            v-model="laser_mode"
            type="number"
            min="0"
            max="16"
            text-align="center"
          ></b-form-input>
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
        variant="primary"
        style="font-size:24px;font-weight: bold;"
      >Modify</b-button>
    </div>
    <SimpleKeyboard v-show="enabled" keyboard_type="number" @onChange="onChange"></SimpleKeyboard>
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
import SimpleKeyboard from '@/components/Tools/SimpleKeyboard.vue'
export default {
  components: {
    SimpleKeyboard,
  },
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      laser_mode: 0,
      modifyLaserModeDialogShow: false,

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
    },
    onChange(input) {
      if (input + "" == "") {
        this.laser_mode = 0;
      } else {
        if (input > 16) {
          input = 16
        }
        this.laser_mode = input;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.manual_settings {
  height: 450px;
  .item-label {
    width: 160px;
    font-size: 26px;
    text-align: left;
    padding: 5px;
  }
  .b-form-input input {
    text-align: center;
  }
  .updown-btns {
    button {
      height: 25px;
      font-size: small;
      text-align: center;
      padding: 0px;
      width: 43px;
      border: 1px solid rgb(255, 255, 255);
      background-color: rgb(0, 123, 255);
    }
  }
}
</style>