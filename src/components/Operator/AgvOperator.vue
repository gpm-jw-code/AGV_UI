<template>
  <div class="agv-operator">
    <b-tabs pills>
      <b-tab :title="$t('agv_control')" active>
        <div class="mt-3 p-1">
          <AgvControl :enabled="operation_enabled_return"></AgvControl>
        </div>
      </b-tab>
      <b-tab :title="$t('zaxis_up_down')">
        <div class="mt-3 p-1">
          <ZAxisControl :enabled="operation_enabled_return" v-if="type=='jw'"></ZAxisControl>
          <ZAxisControl_hao v-if="type=='hao'"></ZAxisControl_hao>
          <!-- <alarm_warn_table></alarm_warn_table> -->
        </div>
      </b-tab>
      <b-tab title="Input">
        <div class="mt-1 p-1">
          <IOTable digital_type="input" :table_data="DIOTableData.Inputs"></IOTable>
        </div>
      </b-tab>
      <b-tab title="Output">
        <div class="mt-1 p-1">
          <IOTable
            :readonly="false"
            digital_type="output"
            :enabled="operation_enabled_return"
            :super_user="isGodMode"
            :table_data="DIOTableData.Outputs"
          ></IOTable>
        </div>
      </b-tab>
      <b-tab title="Manual">
        <div class="mt-1 p-1">
          <ManualSettings :enabled="operation_enabled_return"></ManualSettings>
        </div>
      </b-tab>
    </b-tabs>
    <div @click="VersionTextClickHandle()" class="ui-version text-end px-3">
      UI Version:Beta
      <p>1.0.1</p>
    </div>
    <b-modal
      :key="modal_key"
      class="admin-dialog-modal"
      v-model="modalShow"
      title="Administartor"
      :centered="true"
      :no-close-on-backdrop="true"
      @ok="AdminSwitchDialogResultHandle(true)"
      @cancel="AdminSwitchDialogResultHandle(false)"
      @hidden=" version_text_click_count = 0;modalShow=false"
    >
      <p>Do You Known What Are You Doing?</p>
    </b-modal>
  </div>
</template>

<script>
import AgvControl from './AgvcControl.vue'
import ZAxisControl from './ZAxisControl.vue'
import ZAxisControl_hao from './ZAxisControl_Hao.vue'
import IOTable from './IOTable.vue';
import param from '@/gpm_param';
import clsDIOTable from '@/ViewModels/clsDIOTable';
import ManualSettings from './ManualSettings.vue';
import WebSocketHelp from '@/api/WebSocketHepler'

export default {

  components: {
    AgvControl, ZAxisControl, IOTable, ZAxisControl_hao, ManualSettings
  },
  data() {
    return {
      type: '',
      DIOTableData: new clsDIOTable(),
      trigger_admin_dialog_count: 5,
      version_text_click_count: 0,
      modalShow: false,
      isGodMode: false,
      modal_key: ''
    }
  },
  mounted() {
    this.type = param.type;
    this.DIOTableWSInit();
  },
  methods: {
    DIOTableWSInit() {

      var ws = new WebSocketHelp('ws/DIOTableData')
      ws.Connect();

      ws.wssocket.onmessage = (evt) => {
        this.DIOTableData = JSON.parse(evt.data)
      }
      ws.wssocket.onclose = () => {
        this.DIOTableWSInit()
      }
    },
    VersionTextClickHandle() {
      this.version_text_click_count += 1;
      if (this.version_text_click_count > this.trigger_admin_dialog_count) {
        this.modalShow = true;
      }
    },
    AdminSwitchDialogResultHandle(checked = false) {
      this.version_text_click_count = 0;
      this.isGodMode = checked;
      setTimeout(() => {
        this.modalShow = false;
      }, 100);
    }
  },
  props: {
    ModuleInformation: {
      type: Object,
      default() {
        return {

        }
      }
    },
    operation_enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    operation_enabled_return() {
      if (this.isGodMode)
        return true;
      else
        return this.operation_enabled
    }
  }
}
</script>

<style scoped lang="scss">
.admin-dialog-modal {
  p {
    //
    font-weight: bold;
    user-select: none;
  }
  .admin-dialog-buttons {
    button {
      width: 220px;
      font-size: 50px;
      color: white;
      border-radius: 9px;
      margin: 4px;
    }

    button:hover {
      background-color: gray;
      color: white;
    }

    .yes-btn {
      background-color: rgb(0, 123, 255);
    }
    .no-btn {
      background-color: rgb(220, 53, 69);
    }
  }
}
</style>