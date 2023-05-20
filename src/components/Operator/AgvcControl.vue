<template>
  <div class="agv-control">
    <div v-show="!enabled" class="disable-notify text-start my-2">{{$t('agv_control_notify_text') }}</div>
    <div class="d-flex flex-row">
      <div style="width:200px">
        <el-form label-position="top">
          <el-form-item label="Tag ID">
            <b-form-input size="sm" disabled v-model="vms_data.Tag" :state="vms_data.Tag>0"></b-form-input>
          </el-form-item>
          <div class="row">
            <el-form-item class="col-6" label="X">
              <b-form-input size="sm" disabled v-model.number="vms_data.Pose.position.x"></b-form-input>
            </el-form-item>
            <el-form-item class="col-6" label="Y">
              <b-form-input size="sm" disabled v-model.number="vms_data.Pose.position.y"></b-form-input>
            </el-form-item>
          </div>
          <el-form-item label="Angles">
            <b-form-input size="sm" disabled v-model.number="vms_data.Angle"></b-form-input>
          </el-form-item>

          <div class="row">
            <el-form-item class="col-6" label="Linear X">
              <b-form-input size="sm" disabled v-model.number="vms_data.Pose.position.y"></b-form-input>
            </el-form-item>
            <el-form-item class="col-6" label="Angular Z">
              <b-form-input size="sm" disabled v-model.number="vms_data.Pose.position.y"></b-form-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <agvc_control_panel :enabled="enabled"></agvc_control_panel>
    </div>
  </div>
</template>

<script>
import bus from '@/event-bus.js'
import VMSData from '@/ViewModels/VMSData';
import agvc_control_panel from './AgvcControlPanel'

export default {
  components: {
    agvc_control_panel,
  },
  props: {
    ModuleInformation: {
      type: Object,
      default() {
        return {

        }
      }
    },
    enabled: {
      type: Boolean,
      default: false
    },
    super_user: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      vms_data: new VMSData(),
    }
  },
  computed: {
    TagID() {
      if (this.ModuleInformation.reader == undefined) {
        return -1;
      } else {
        return this.ModuleInformation.reader.tagID;
      }
    },
  },
  methods: {
  },
  mounted() {
    bus.on('/vms_data', (vms_data) => {
      this.vms_data = vms_data
    });
  },
}
</script>

<style scoped lang="scss">
.agv-control {
  .disable-notify {
    color: red;
    font-weight: bold;
  }
}
</style>
