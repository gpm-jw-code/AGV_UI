<template>
  <div class="status-card">
    <h4 class="text-start">{{$t('Status_info')}}</h4>

    <div class="w-100 border p-3">
      <div class="module-error" v-show="false">
        <el-alert
          class="my-1"
          show-icon
          title="光達模組異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-alert
          class="my-1"
          show-icon
          title="磁導引模組異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-alert
          class="my-1"
          show-icon
          title="走行馬達異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-alert
          class="my-1"
          show-icon
          title="電池模組異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-alert
          class="my-1"
          show-icon
          title="IO模組異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-alert
          class="my-1"
          show-icon
          title="Barcode Reader模組異常"
          type="error"
          effect="dark"
          :closable="false"
        />
        <el-divider></el-divider>
      </div>
      <table class="status-tb w-100">
        <tbody>
          <tr align="justify">
            <td>{{$t('status')}}</td>
            <td class="val-column">
              <b-button class="w-100" :variant="state_btn_variant">
                <b>{{vms_data.SubState }}</b>
              </b-button>
            </td>
            <td>Laser Mode</td>
            <td>
              <b-form-input size="sm" disabled v-model="vms_data.Current_LASER_MODE"></b-form-input>
            </td>
            <!-- <td>CIM {{$t('status')}}</td>
            <td class="val-column">4</td>-->
          </tr>
          <tr align="justify">
            <td>{{$t('current_position')}}</td>
            <td class="val-column">
              <b-form-input size="sm" disabled v-model="vms_data.Tag" :state="vms_data.Tag>0"></b-form-input>
              <!-- <el-input disabled v-model="vms_data.Tag"></el-input> -->
            </td>
            <td>{{$t('target_position')}}</td>
            <td class="val-column">
              <b-form-input size="sm" disabled v-model="vms_data.NavInfo.Destination"></b-form-input>
              <!-- <el-input disabled v-model="currentPosition"></el-input> -->
            </td>
          </tr>
          <tr align="justify">
            <td>{{$t('action_name')}}</td>
            <td class="val-column">
              <b-form-input size="sm" disabled v-model="vms_data.ZAxisActionName"></b-form-input>
            </td>
            <td>{{$t('carrier_id')}}</td>
            <td class="val-column">
              <b-form-input size="sm" disabled v-model="vms_data.CST_Data"></b-form-input>
            </td>
          </tr>
          <tr align="justify">
            <td>{{$t('abormal')}}</td>
            <td colspan="4">
              <b-form-textarea disabled v-model="NewestAlarm" :state="NewestAlarm==''"></b-form-textarea>
              <!-- <el-input type="textarea" disabled v-model="NewestAlarm"></el-input> -->
            </td>
          </tr>
          <tr v-if="true" align="justify">
            <td>地圖比對率</td>
            <td>
              <b-form-input size="sm" disabled v-model="vms_data.MapComparsionRate"></b-form-input>
            </td>
          </tr>
          <tr v-if="false" align="justify">
            <td>AGV Direct</td>
            <td>
              <b-form-input size="sm" disabled v-model="vms_data.AGV_Direct"></b-form-input>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import bus from '@/event-bus.js'
import VMSData from '@/ViewModels/VMSData.js'
export default {
  props: {

  },
  data() {
    return {
      currentPosition: '123',
      vms_data: new VMSData()
    }
  },
  computed: {
    state_btn_variant() {
      var _state = this.vms_data.SubState.toUpperCase();
      if (_state == "DOWN" | _state == "ALARM" | _state == "STOP" | _state == "SYSTEM_INIT") {
        return 'danger'
      }
      else if (_state == "INITIALIZE" | _state == "CHARGING") {
        return 'primary'
      }
      else if (_state == "RUN" | _state == "WORKING") {
        return "success";
      }
      else if (_state == "IDLE" | _state == "WARNING") {
        return 'warning'
      }
      return ""
    },
    CurrentPosition() {
      if (this.ModuleInformation.nav_state == undefined) {
        return '-1';
      } else {
        return this.ModuleInformation.nav_state.lastVisitedNode;
      }
    },
    CarrierID() {
      if (this.ModuleInformation.CSTReader == undefined) {
        return '-1';
      } else {
        return this.ModuleInformation.CSTReader.data;
      }
    },
    NewestAlarm() {
      if (this.vms_data.NewestAlarm == undefined)
        return '';

      return this.$i18n.locale == 'zh-TW' ? this.vms_data.NewestAlarm.CN : this.vms_data.NewestAlarm.Description;
    }
  },

  mounted() {
    bus.on('/vms_data', (data) => {
      this.vms_data = data
    });
  },
}
</script>

<style lang="scss">
.status-card {
  h4 {
    font-weight: bold;
  }

  tr {
    height: 50px;
  }
  td {
    //width: 120px;
    font-weight: bold;
    font-size: small;
    padding: 0px 10px;
  }

  .status-tb {
    .val-column {
      width: 30%;
    }
  }
}
</style>