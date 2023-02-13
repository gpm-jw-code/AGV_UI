<template>
  <div class="agv-operator">
    <b-tabs pills>
      <b-tab title="車控" active>
        <div class="mt-3 p-1">
          <AgvControl :ModuleInformation="ModuleInformation"></AgvControl>
        </div>
      </b-tab>
      <b-tab title="升降">
        <div class="mt-3 p-1">
          <ZAxisControl v-if="type=='jw'"></ZAxisControl>
          <ZAxisControl_hao v-if="type=='hao'"></ZAxisControl_hao>
          <!-- <alarm_warn_table></alarm_warn_table> -->
        </div>
      </b-tab>
      <b-tab title="Input">
        <div class="mt-1 p-1">
          <IOTable></IOTable>
        </div>
      </b-tab>
      <b-tab title="Output">
        <div class="mt-1 p-1">
          <IOTable></IOTable>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import AgvControl from './AgvcControl.vue'
import ZAxisControl from './ZAxisControl.vue'
import ZAxisControl_hao from './ZAxisControl_Hao.vue'
import IOTable from './IOTable.vue';
import param from '@/gpm_param';
export default {

  components: {
    AgvControl, ZAxisControl, IOTable, ZAxisControl_hao
  },
  data() {
    return {
      type: ''
    }
  },
  mounted() {
    this.type = param.type;
  },
  props: {
    ModuleInformation: {
      type: Object,
      default() {
        return {

        }
      }
    }
  },
}
</script>

<style>
</style>