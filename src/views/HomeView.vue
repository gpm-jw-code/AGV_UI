<template>
  <div class="home h-100" v-loading="loading">
    <!-- Top Header  -->
    <div>
      <div class="status d-flex flex-row">
        <div class="sys-name bg-success flex-fill d-flex flex-row justify-content-center">
          <div>GPM AGV</div>
          <!-- <div v-if="VMSData.Simulation" class="simulation-mode p-1 mx-2">SIMULATION</div> -->
        </div>
        <div class="agvc-name flex-fill" @click="where_r_u()">{{VMSData.CarName}}</div>
        <div class="account-name flex-fill">{{Operator_role }}</div>
        <div class="version-name flex-fill">{{ App_version }}</div>
      </div>
      <div
        v-bind:class="VMSData.LightsStates.Front?'light-on-front':'light-off-front'"
        class="w-100"
      ></div>
    </div>

    <!-- Alarm and Notifies -->
    <div
      v-if="NewestAlarm!=undefined"
      :class="NewestAlarm.Level=='Alarm'?'alarm-show p-1 bg-danger':'alarm-show p-1 bg-warning'"
    >{{ $i18n.locale=='zh-TW'? NewestAlarm.CN: NewestAlarm.Description }}</div>
    <div v-if="back_end_server_err" class="server-error py-1 border">
      <i class="bi bi-exclamation-diamond"></i>
      {{$t('backend_server_error')}}
    </div>
    <div v-if="back_end_server_connecting" class="server-connecting py-1 border">
      <i class="bi bi-exclamation-diamond"></i>
      {{$t('connecting')}}
    </div>
    <!--  -->

    <div class="d-flex flex-row h-100">
      <div v-bind:class="VMSData.LightsStates.Left?'light-on':'light-off'" class="h-100"></div>
      <!--Side 左側邊-->
      <div class="side h-100">
        <div class="opt-buttons px-1 py-1 d-flex flex-column">
          <b-button
            :disabled="back_end_server_err||VMSData.IsSystemIniting"
            @click="AGVInitialize()"
            class="mb-1 p-2"
            v-bind:class="VMSData.MainState.toLowerCase()"
            block
          >
            <b>{{$t('initialize') }}</b>
          </b-button>
          <b-button
            :disabled="back_end_server_err"
            @click="AGVResetAlarm()"
            class="mb-1 p-2"
            block
            :variant="alarmResetBtnVariant"
          >
            <b>{{$t('reset_alarm') }}</b>
          </b-button>
          <b-button
            :disabled="back_end_server_err"
            @click="AGVBuzzerOff()"
            variant="outline-dark"
            class="mb-1 p-2"
            block
          >
            <b>{{$t('buzzer_off') }}</b>
          </b-button>
          <b-button
            :disabled="back_end_server_err"
            @click="ShowRemoveCstDialog()"
            variant="outline-dark"
            class="mb-1 p-2"
            block
          >
            <b>{{$t('cst-remove') }}</b>
          </b-button>
          <b-button
            :disabled="back_end_server_err"
            variant="outline-dark"
            class="mb-1 p-2"
            block
            @click="ShowLogin()"
          >
            <b>{{LoginBtnText}}</b>
          </b-button>

          <login ref="login"></login>
        </div>
        <!--模式切換Switch-->
        <div class="modes px-2 text-start">
          <div class="d-flex flex-row">
            <div class="mode-item-label py-2">Online Mode</div>
            <el-switch
              v-model="IsOnlineMode"
              @click.prevent="OnlineModeSwitchHandle()"
              :disabled="back_end_server_err||VMSData.IsSystemIniting"
              width="75"
              size="large"
              inline-prompt
              inactive-text="Offline"
              active-text="Online"
              active-color="rgb(13, 110, 253)"
              inactive-color="rgb(220, 53, 69)"
            ></el-switch>
          </div>
          <div class="d-flex flex-row">
            <div class="mode-item-label py-2">Auto Mode</div>
            <el-switch
              v-model="IsAutoMode"
              @click.stop.prevent="AutoModeSwitchHandle()"
              :disabled="back_end_server_err||VMSData.IsSystemIniting"
              width="75"
              size="large"
              inline-prompt
              inactive-text="Manual"
              active-text="Auto"
              active-color="rgb(13, 110, 253)"
              inactive-color="rgb(220, 53, 69)"
            ></el-switch>
          </div>
        </div>
        <div class="connection-status border m-2 p-3 py-1">
          <div class="state-title">{{$t('connection-states') }}</div>
          <connection_state></connection_state>
        </div>

        <div class="battery border m-2 my-0 p-3 py-1">
          <div class="state-title py-1">
            {{$t('battery-level')}}
            <el-tag v-show="VMSData.BatteryStatus.IsError" type="warning" effect="dark">異常</el-tag>
          </div>
          <battery></battery>
        </div>
        <div class="mileage border m-2 p-3 py-1">
          <div class="state-title">{{$t('mileage')}}</div>
          <mileage></mileage>
        </div>
        <div>{{ time }}</div>
        <div>
          <emo :disabled="back_end_server_err"></emo>
        </div>
      </div>
      <!--主要內容 TabControl-->
      <div class="flex-fill border p-3">
        <b-tabs pills @activate-tab="TabChangedHandler">
          <b-tab :title="$t('status')" active>
            <div class="mt-3 border p-1">
              <status_card :ModuleInformation="moduleInformation"></status_card>
            </div>
          </b-tab>
          <!--Alarm Table-->
          <b-tab :title="$t('abnormal-record')">
            <div class="mt-3 border p-1">
              <alarm_warn_table></alarm_warn_table>
            </div>
          </b-tab>
          <b-tab :title="$t('operation')">
            <div class="mt-3 border p-1">
              <agv_operator :agv_type="VMSData.Agv_Type" :operation_enabled="operation_enabled"></agv_operator>
            </div>
          </b-tab>
          <b-tab v-if="is_god_mode_now" :title="$t('3d_model')">
            <div class="mt-3 border p-1">
              <ForkAGV3D></ForkAGV3D>
            </div>
          </b-tab>

          <b-tab title="AGVS MSG">
            <div class="mt-3 border p-1">
              <AGVSMsgDisplay ref="agvs_msg_table"></AGVSMsgDisplay>
            </div>
          </b-tab>
          <b-tab v-if="is_god_mode_now" title="Task">
            <div class="mt-3 border p-1">
              <TaskDeliveryVue></TaskDeliveryVue>
            </div>
          </b-tab>

          <b-tab v-if="false" title="CST READER">
            <div class="mt-3 border p-1">
              <CSTReader></CSTReader>
            </div>
          </b-tab>
        </b-tabs>
        <!--語系切換按鈕-->
        <div class="lang-switch">
          <jw_switch
            @switch="LangChangeHandle"
            :default="IsUseChinese"
            active_text="CH"
            active_color="rgb(13, 110, 253)"
            inactive_text="EN"
            inactive_color="rgb(8, 135, 150)"
          ></jw_switch>
          <!-- <el-switch
            @change="LangChangeHandle"
            v-model="IsUseChinese"
            size="large"
            active-text="CH"
            inactive-text="EN"
            active-color="rgb(40, 167, 69)"
            inline-prompt
            width="70"
          ></el-switch>-->
        </div>
      </div>
      <div v-bind:class="VMSData.LightsStates.Right?'light-on':'light-off'" class="h-100"></div>
    </div>
    <div v-bind:class="VMSData.LightsStates.Back?'light-on-back':'light-off-front'" class="w-100"></div>

    <!--對話框們-->
    <div class="modals">
      <!--等待上線動作完成對話框 -->
      <b-modal
        v-model="wait_online_request_dialog_show"
        title="AGV Online Requesting"
        :centered="true"
        :hideFooter="true"
        :noCloseOnBackdrop="true"
        :noCloseOnEsc="true"
        :hideHeaderClose="true"
        header-bg-variant="primary"
        header-text-variant="light"
      >
        <p class="py-3">{{$t('wait_online_text')}}</p>
      </b-modal>
      <!--上線失敗警示對話框-->
      <b-modal
        v-model="ShowOnlineFailDialog"
        header-bg-variant="danger"
        header-text-variant="light"
        :centered="true"
        title="上線請求失敗"
        :ok-only="true"
      >
        <p ref="online-fail-msg"></p>
      </b-modal>

      <!--取消初始化對話框 -->
      <b-modal
        v-model="cancelInitComfirmDialogShow"
        header-bg-variant="primary"
        header-text-variant="light"
        :centered="true"
        title="Cancel Initialze Process"
        @ok="CancelInitProcessWorker"
      >
        <p>{{$t('cancel_init_action_notify')}}</p>
      </b-modal>

      <!--確認進行初始化對話框 -->
      <b-modal
        v-model="StartInitComfirmDialogShow"
        header-bg-variant="primary"
        header-text-variant="light"
        :centered="true"
        title="Initialze"
        @ok="InitializeWorker"
      >
        <p>{{$t('start_init_action_notify')}}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import battery from '@/components/Battery.vue'
import mileage from '@/components/Mileage.vue'
import emo from '@/components/EMOButton.vue'
import status_card from "@/components/StatusInfoCard.vue"
import alarm_warn_table from '@/components/AlarmWarningTable.vue'
import agv_operator from '@/components/Operator/AgvOperator.vue'
import login from '@/components/Login.vue'
import connection_state from '@/components/ConnectionStates.vue'
import ForkAGV3D from '@/components/3DModel/ForkAGV3DModel.vue'
import TaskDeliveryVue from '@/components/VMSTask/TaskDelivery.vue'
import CSTReader from '@/components/CSTReaderView.vue'
import { Initialize, CancelInitProcess, ResetAlarm, BuzzerOff, RemoveCassette, MODESwitcher, Where_r_u } from '@/api/VMSAPI'
import bus from '@/event-bus.js'
import VMSData from '@/ViewModels/VMSData.js'
import UserInfo from '@/ViewModels/UserInfo.js'
import param from '@/gpm_param'
import { version } from '@/gpm_param'
import jw_switch from "@/components/UIComponents/jw-switch.vue"
import Notifier from "@/api/NotifyHelper.js"
import WebSocketHelp from '@/api/WebSocketHepler'
import AGVSMsgDisplay from '@/components/AGVSMsgDisplay.vue'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import moment from 'moment'

// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    jw_switch, battery, mileage, emo, status_card, alarm_warn_table, agv_operator, login, connection_state, ForkAGV3D, TaskDeliveryVue, CSTReader, AGVSMsgDisplay
  },
  data() {
    return {
      time: '2022/12/12 19:00:09',
      is_god_mode_now: false,
      back_end_server_err: false,
      back_end_server_connecting: true,
      loading: false,
      dialogTableVisible: false,
      isInitializing: false,
      cancelInitComfirmDialogShow: false,
      StartInitComfirmDialogShow: false,
      IsUseChinese: true,
      wait_online_request_dialog_show: false,
      remove_CstData_ComfirmDialog_Show: false,
      ShowOnlineFailDialog: false,
      moduleInformation: {},
      VMSData: new VMSData(),
      Operator_role: 'Operator',
      CurrentUserinfo: new UserInfo('', 0),
      LoginBtnText: '登入',
      server_err_state_text: '連線中...',
      init_btn_blink_timer: null,
      mode_switch_data: {
        type: 'online', //auto
        state: false
      },
      currentTabs: 0,
      previous_tagID: -99,
      ws: null,
      previousAGVPoseIsError: false,
      ShowAGVPoseErrorModel: false
    }
  },
  methods: {
    async where_r_u() {
      await Where_r_u();
    },
    LangChangeHandle(checked) {
      this.IsUseChinese = checked;
      this.$i18n.locale = this.IsUseChinese ? 'zh-TW' : 'en-US';
      bus.emit('/lang_changed', this.$i18n.locale);
      if (this.IsUseChinese) {
        Notifier.Success("語言變更:中文", 'bottom', 800);
      } else {
        Notifier.Primary("Language:English", 'bottom', 800);
      }
    },
    TabChangedHandler(currentTabs, previousTabs) {
      this.currentTabs = currentTabs;
      if (currentTabs == 1)
        bus.emit('/alarmtable_tab_click')
    },
    ShowLogin() {
      this.$refs.login.Show();
    },
    async AGVInitialize() {
      if (VMSData.isInitializing) {
        this.cancelInitComfirmDialogShow = true;
      }
      else {
        // this.StartInitComfirmDialogShow = true;
        /**測試 */
        this.$swal.fire({
          title: 'AGV Initialize',
          text: `${this.$t('start_init_action_notify_submarin_agv')}`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'OK',
          customClass: 'my-sweetalert'
        }).then((result) => {
          if (result.isConfirmed) {
            this.InitializeWorker();
          }
        })

        /***************************************** */
      }
    },
    ShowRemoveCstDialog() {
      this.$swal.fire({
        title: `${this.$t('cst-remove')}`,
        text: `${this.$t('cst-remove-confirm-text')}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'OK',
        customClass: 'my-sweetalert'
      }).then((result) => {
        if (result.isConfirmed) {
          this.AGVRemoveCassette();
        }
      })

    },
    async InitializeWorker() {
      this.isInitializing = true;
      var result = await Initialize();

    },
    async CancelInitProcessWorker() {
      await CancelInitProcess()
      clearInterval(this.init_btn_blink_timer);
      this.isInitializing = false;

    },
    async AGVResetAlarm() {
      await ResetAlarm();
    },
    async AGVBuzzerOff() {
      await BuzzerOff();
    },
    async AGVRemoveCassette() {
      await RemoveCassette();
      setTimeout(() => {
        Notifier.Success("CST Data Already Clear", 'bottom', 1000);
        this.remove_CstData_ComfirmDialog_Show = false;
      }, 300);
    },
    AGVSMsgIOWebsocketInit() {
      var ws = new WebSocketHelp('ws/AGVS_MSG_IO');
      ws.Connect();
      var socket = ws.wssocket;
      socket.onmessage = (event) => {
        var msg_io_data = JSON.parse(event.data);
        if (this.$refs['agvs_msg_table'] != undefined) {
          this.$refs['agvs_msg_table'].AddNewMsgData(msg_io_data);

        }
        if (msg_io_data.Message.includes('0301')) {
          var task_msg = JSON.parse(msg_io_data.Message.replaceAll("*\r", ""))
          var task_name = task_msg["Header"]["0301"]["Task Name"];
          ElNotification({
            title: 'NAVITATOR_NEW_TASK',
            message: task_name,
            type: 'success',
            duration: 10000
          })
        }

      };
    },
    VMSDataWebsocketInit() {
      var ws = new WebSocketHelp('ws/AGVCState');
      ws.Connect();
      var socket = ws.wssocket;
      socket.onmessage = (event) => {

        this.back_end_server_err = false;
        this.back_end_server_connecting = false;
        this.VMSData = JSON.parse(event.data);
        // class info{
        //     AGV_Name
        //     Current_Tag
        //     State
        //     IsOnline
        //     Rotation
        // }
        //agv_data: info[] 
        if (this.VMSData.Tag > 0) {
          bus.emit('/agv_name_list', [{
            AGV_Name: this.VMSData.CarName,
            Current_Tag: this.VMSData.Tag,
            State: this.VMSData.MainState,
            IsOnline: this.VMSData.OnlineMode == 1,
            Rotation: 0
          }])
          if (this.VMSData.Tag != this.previous_tagID) {
            Notifier.Primary(`Tag Detected:${this.VMSData.Tag}`, 'bottom', 1500);
            this.ShowMaxSpeedLimitNotification(this.VMSData.Tag, this.VMSData.NavInfo.Speed_max_limit);

          }
        }
        this.previous_tagID = this.VMSData.Tag;
        this.AGVPoseErrorHandler();
        this.BusPublishDataOut();
      };
      socket.onclose = () => {
        this.back_end_server_connecting = false;
        this.back_end_server_err = true;
        this.server_err_state_text = "後端伺服器異常";
        this.VMSDataWebsocketInit()
      }
      socket.onerror = () => {
        this.back_end_server_connecting = false;
        this.server_err_state_text = "後端伺服器異常";
        this.back_end_server_err = true;
      }
      this.ws = ws;
    },
    ShowMaxSpeedLimitNotification(tag, speed_limit) {
      if (speed_limit == -1)
        return;
      ElNotification({
        title: '限速',
        message: `Tag[${tag}] AGV 速度限制 : ${speed_limit} `,
        type: 'warning',
        duration: 3000
      })
    },
    AGVPoseErrorHandler() {
      if (this.VMSData.IsAGVPoseError != this.previousAGVPoseIsError) {
        //this.ShowAGVPoseErrorModel = this.VMSData.IsAGVPoseError;
        if (this.VMSData.IsAGVPoseError) {
          ElNotification({
            title: 'POSE ERROR',
            message: 'TAG讀取角度異常:與導航角度不同',
            type: 'warning',
            duration: 3000
          })
        }
        this.previousAGVPoseIsError = this.VMSData.IsAGVPoseError;
      }
    },
    BusPublishDataOut() {
      bus.emit('/vms_data', this.VMSData);
      bus.emit('/agv_current_tag', this.VMSData.Tag);
      bus.emit('/battery', this.VMSData.BatteryStatus);
      bus.emit('/mileage', this.VMSData.Mileage);
      bus.emit('/zaxis_driver_state', this.VMSData.ZAxisDriverState)
      bus.emit('/drivers_state', this.VMSData.DriversStates)
      bus.emit('/z_axis_position', this.VMSData.ZAxisDriverState.position)
    },
    AutoModeSwitchHandle() {
      this.mode_switch_data.type = 'auto'
      this.mode_switch_data.state = !this.IsAutoMode;

      this.$swal.fire({
        title: `${this.$t('agv-auto-mode')}`,
        text: `${this.mode_switch_data.state ? this.$t('agv-auto-mode-alert') : this.$t('agv-manual-mode-alert')}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'OK',
        customClass: 'my-sweetalert'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ModeSwitchHandler();
        }
      })


    },
    OnlineModeSwitchHandle() {
      if (!this.IsOnlineMode && this.VMSData.MainState.toUpperCase() != 'IDLE' && this.VMSData.MainState.toUpperCase() != 'CHARGING') {
        Notifier.Danger(`當前狀態無法上線(${this.VMSData.MainState})`, "top", 5000);
        return;
      }

      this.mode_switch_data.type = 'online'
      this.mode_switch_data.state = !this.IsOnlineMode;

      this.$swal.fire({
        title: `${this.$t('agv-online')}`,
        text: `${this.mode_switch_data.state ? this.$t('agv-online-alert') : this.$t('agv-offline-alert')}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'OK',
        customClass: 'my-sweetalert'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ModeSwitchHandler();
        }
      })


    },
    async ModeSwitchHandler() {
      if (this.mode_switch_data.type == 'auto') {
        var ret = await MODESwitcher.AutoModeSwitch(this.IsAutoMode ? 0 : 1)
      } else {
        this.wait_online_request_dialog_show = true;
        var ret = await MODESwitcher.OnlineModeSwitch(this.IsOnlineMode ? 0 : 1)
        if (!ret.Success) {
          this.$refs['online-fail-msg'].innerText = ret.Message;
          this.ShowOnlineFailDialog = true;

        }

        setTimeout(() => {
          this.wait_online_request_dialog_show = false;
        }, 1000);
      }
    },
  },
  computed: {
    alarmResetBtnVariant() {
      return this.VMSData.AlarmCodes.length > 0 ? 'danger' : 'outline-dark'
    },

    IsAutoMode() {
      return this.VMSData.AutoMode == 1;
    },
    IsOnlineMode() {
      return this.VMSData.OnlineMode == 1;
    },
    operation_enabled() {
      if (this.CurrentUserinfo.Role == 3)
        return true;
      else if (this.CurrentUserinfo.Role == 0) {
        return false
      } else {
        return !this.IsAutoMode && !this.IsOnlineMode
      }
    },
    App_version() {
      return version;
    },
    NewestAlarm() {
      if (this.VMSData.NewestAlarm == undefined) {
        return undefined
      }
      return this.VMSData.NewestAlarm
    },
    ModeSwitchDisplay() {
      if (this.mode_switch_data.type == 'online') {
        return this.IsOnlineMode ? 'Offline' : 'Online'
      } else {
        return this.IsAutoMode ? 'Manual' : 'Auto'
      }
    }
  },
  mounted() {
    // setInterval(async () => {
    //   this.moduleInformation = await GetModuleInformation();
    // }, 200);
    this.VMSDataWebsocketInit();
    this.AGVSMsgIOWebsocketInit();
    bus.on('/login_success', (user_info) => {
      this.CurrentUserinfo = user_info;
      this.Operator_role = this.CurrentUserinfo.GetRoleName()
      this.LoginBtnText = '登出'
      Notifier.Success(`${this.CurrentUserinfo.UserName}(${this.CurrentUserinfo.Role}) Login Success`);
    })
    bus.on('/god_mode_changed', (is_god_mode_now) => {
      this.is_god_mode_now = is_god_mode_now
    });
    setInterval(() => {
      this.time = moment(Date.now()).format('yyyy/MM/DD HH:mm:ss');
    }, 1000);
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  },
  destroyed() {
    alert('destroy')
    if (this.ws) {
      this.ws.Close();
    }
  }
}
</script>

<style lang="scss" scoped>
.simulation-mode {
  font-size: 20px;
  animation: color-change 1s infinite;
}
.server-connecting {
  animation: server-connectingcolor-change 1s infinite;
}

.server-error {
  animation: server-errorcolor-change 1s infinite;
}
@keyframes server-errorcolor-change {
  0% {
    background-color: red;
    color: white;
  }
  50% {
    background-color: rgb(255, 170, 170);
    color: black;
  }
  100% {
    background-color: red;
    color: white;
  }
}

@keyframes server-connectingcolor-change {
  0% {
    background-color: rgb(255, 193, 22);
    color: white;
  }
  50% {
    background-color: rgb(255, 237, 156);
    color: black;
  }
  100% {
    background-color: rgb(255, 193, 22);
    color: white;
  }
}

.status {
  .sys-name,
  .agvc-name,
  .account-name,
  .version-name {
    margin: auto 1px;
    color: white;
    font-weight: bold;
    font-size: 22px;
    // letter-spacing: 2px;
  }

  .sys-name {
    margin-left: 0;
  }
  .agvc-name {
    background-color: rgb(0, 197, 211);
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
  font-weight: bold;
  color: white;
}

.modes {
  .mode-item-label {
    width: 120px;
    font-weight: bold;
  }
}
.side {
  width: 250px;
  .state-title {
    font-weight: bold;
    font-size: 14px;
  }
  .opt-buttons {
    font-weight: bold;
    .stop,
    .alarm,
    .down {
      background-color: rgb(220, 53, 69);
    }
    .initialize {
      animation: initializing-color-change 1s infinite;
    }
    .idle,
    .run,
    .charging,
    .working,
    .warning {
      background-color: rgb(13, 110, 253);
    }

    @keyframes initializing-color-change {
      0% {
        background-color: rgb(13, 110, 253);
        color: white;
      }
      50% {
        background-color: white;
        color: rgb(13, 110, 253);
      }
      100% {
        background-color: rgb(13, 110, 253);
        color: white;
      }
      // 100% {
      //   background-color: red;
      //   color: white;
      // }
    }
  }
}

.light-on,
.light-off {
  width: 5px;
}
.light-on {
  background-color: rgb(104, 173, 253);
}

.light-off.light-off-front {
  background-color: white;
}
.light-on-back {
  position: fixed;
  bottom: 0;
}
.light-on-front,
.light-on-back {
  background-color: rgb(255, 61, 61);
  animation: server-errorcolor-change 1s infinite;
}

.light-on-front,
.light-off-front,
.light-on-back {
  height: 5px;
}

.lang-switch {
  // background-color: red;
  width: 100px;
  height: 50px;
  position: absolute;
  right: 0px;
  top: 40px;
  padding: 2px;
  align-items: center;
}
</style>
