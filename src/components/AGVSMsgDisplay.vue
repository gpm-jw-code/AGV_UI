<template>
  <el-table height="580" :data="MsgDataList" border>
    <el-table-column label="時間" prop="TimeFormated"></el-table-column>
    <el-table-column label="方向" prop="Direction_str">
      <template #default="scope">
        <el-tag
          effect="dark"
          :type="GetTagType(scope.row.Direction_str)"
          disable-transitions
        >{{scope.row.Direction_str}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="Message" prop="Msg_Display"></el-table-column>
  </el-table>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      MsgDataList: []
    }
  },
  methods: {
    AddNewMsgData(data) {
      var ary = []

      if (this.MsgDataList.length >= 20) {
        this.MsgDataList.removeAt(0)
      }
      data.TimeFormated = moment(data.Time).format('yyyy-MM-DD HH:mm:ss')
      data.Direction_str = data.Direction == 0 ? 'AGVS->VMS' : 'VMS->AGVS'
      data.Msg_Display = data.Message.substring(0, 150) + '...';
      this.MsgDataList.unshift(data);
    }
    ,
    GetTagType(Direction_str) {
      return Direction_str == "AGVS->VMS" ? 'danger' : 'primary';
    }
  },
}
</script>

<style>
</style>