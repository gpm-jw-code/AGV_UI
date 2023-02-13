<template>
  <div class="home h-100">
    <div class="status d-flex flex-row">
      <div class="sys-name flex-fill p-1">GPM AGVS System</div>
      <div class="agvc-name flex-fill p-1">AGV 001</div>
      <div class="account-name flex-fill p-1">Operator</div>
      <div class="version-name flex-fill p-1">2.1.24</div>
    </div>
    <div class="alarm-show p-1">Alarm</div>
    <div class="d-flex flex-row h-100">
      <div class="side h-100">
        <div class="opt-buttons d-flex flex-column">
          <b-button
            @click="AGVInitialize()"
            v-bind:style="initBtnStyle"
            class="mb-2 p-2"
            squared
            block
          >初始化</b-button>
          <b-button
            @click="AGVResetAlarm()"
            style="background-color: rgb(220, 53, 69)"
            class="mb-2 p-2"
            squared
            block
          >異常排除</b-button>
          <b-button
            @click="AGVBuzzerOff()"
            variant="light"
            class="border mb-2 p-2"
            squared
            block
          >蜂鳴器關閉</b-button>
          <b-button
            @click="AGVRemoveCassette()"
            variant="light"
            class="border mb-2 p-2"
            squared
            block
          >移除卡匣</b-button>
          <b-button variant="light" class="border mb-2 p-2" squared block @click="ShowLogin()">登入</b-button>

          <login ref="login"></login>
        </div>
        <div class="modes p-2 text-start">
          <div>Online Mode:</div>
          <div>Auto Mode:</div>
        </div>
        <div class="connection-status border m-2 p-3">
          <h5>連線狀態</h5>
          <connection_state></connection_state>
        </div>

        <div class="battery border m-2 my-0 p-3">
          <h5>電量</h5>
          <battery></battery>
        </div>
        <div class="mileage border m-2 p-3">
          <h5>里程數</h5>
          <mileage></mileage>
        </div>
        <div>
          <emo></emo>
        </div>
      </div>
      <div class="flex-fill border p-3">
        <b-tabs pills>
          <b-tab title="狀態" active>
            <div class="mt-3 border p-1">
              <status_card :ModuleInformation="moduleInformation"></status_card>
            </div>
          </b-tab>
          <b-tab title="異常紀錄">
            <div class="mt-3 border p-1">
              <alarm_warn_table></alarm_warn_table>
            </div>
          </b-tab>
          <b-tab title="操作">
            <div class="mt-3 border p-1">
              <agv_operator :ModuleInformation="moduleInformation"></agv_operator>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>



<script>
import battery from '@/components/Battery.vue'
import mileage from '@/components/Mileage.vue'
import emo from '@/components/EMOButton.vue'
import status_card from "@/components/StatusInfoCard.vue"
import alarm_warn_table from '@/components/AlarmWarningTable.vue'
import agv_operator from '@/components/AgvOperator.vue'
import login from '@/components/Login.vue'
import connection_state from '@/components/ConnectionStates.vue'
import { GetModuleInformation, Initialize, ResetAlarm, BuzzerOff, RemoveCassette } from '@/api/AGVS'

import param from '@/gpm_param'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    battery, mileage, emo, status_card, alarm_warn_table, agv_operator, login, connection_state
  },
  data() {
    return {
      dialogTableVisible: false,
      moduleInformation: {},
      initBtnBGColor: 'rgb(220, 53, 169)'
    }
  },
  methods: {
    ShowLogin() {
      this.$refs.login.Show();
    },
    async AGVInitialize() {

      this.Initializing();
      await Initialize();
    },
    async AGVResetAlarm() {
      await ResetAlarm();
    },
    async AGVBuzzerOff() {
      await BuzzerOff();
    },
    async AGVRemoveCassette() {
      await RemoveCassette();
    },
    Initializing() {
      this.initBtnBGColor = 'grey';
      setInterval(() => {
        if (this.initBtnBGColor != 'rgb(40, 167, 69)') {
          this.initBtnBGColor = 'rgb(40, 167, 69)'
        } else {
          this.initBtnBGColor = 'grey'
        }
      }, 500);
    }
  },
  computed: {
    initBtnStyle() {
      return {
        backgroundColor: this.initBtnBGColor
      }
    }
  },
  mounted() {
    setInterval(async () => {
      this.moduleInformation = await GetModuleInformation();
    }, 200);
    alert(param.type)

  },
}
</script>

<style lang="scss">
.status {
  .sys-name,
  .agvc-name,
  .account-name,
  .version-name {
    margin: auto 1px;
    color: white;
    font-weight: bold;
  }

  .sys-name {
    background-color: rgb(40, 167, 69);
    margin-left: 0;
  }
  .agvc-name {
    background-color: rgb(108, 117, 125);
  }
  .account-name {
    background-color: rgb(23, 162, 184);
  }
  .version-name {
    background-color: rgb(0, 123, 255);
    margin-right: 0;
  }
}

.alarm-show {
  background-color: rgb(248, 215, 218);
}

.side {
  width: 250px;
  h5 {
    font-weight: bold;
  }
}
</style>
