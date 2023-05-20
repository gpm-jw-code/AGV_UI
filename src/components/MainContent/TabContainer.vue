<template>
  <!--主要內容 TabControl-->
  <div class="flex-fill border p-3">
    <b-tabs pills @activate-tab="TabChangedHandler">
      <b-tab :title="$t('status')" active>
        <div class="mt-3 border p-1">
          <status_card></status_card>
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
          <agv_operator :agv_type="VMSData.Agv_Type"></agv_operator>
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
      <b-tab v-if="true" title="Task">
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
</template>

<script>
import status_card from "@/components/StatusInfoCard.vue"
import alarm_warn_table from '@/components/AlarmWarningTable.vue'
import agv_operator from '@/components/Operator/AgvOperator.vue'
import ForkAGV3D from '@/components/3DModel/ForkAGV3DModel.vue'
import AGVSMsgDisplay from '@/components/AGVSMsgDisplay.vue'
import TaskDeliveryVue from '@/components/VMSTask/TaskDelivery.vue'
import CSTReader from '@/components/CSTReaderView.vue'
import jw_switch from "@/components/UIComponents/jw-switch.vue"
import Notifier from "@/api/NotifyHelper.js"

import VMSData from '@/ViewModels/VMSData.js';
import bus from '@/event-bus.js'
export default {
  components: { jw_switch, status_card, alarm_warn_table, agv_operator, ForkAGV3D, AGVSMsgDisplay, TaskDeliveryVue, CSTReader },
  props: {
    VMSData: {
      type: Object,
      default() {
        return new VMSData();
      }
    },
  },
  data() {
    return {
      IsUseChinese: true
    }
  },
  methods: {
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
  },
}
</script>

<style lang="scss">
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