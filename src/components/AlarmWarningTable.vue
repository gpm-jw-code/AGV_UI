<template>
  <div class="alarm-warn-table">
    <div class="d-flex flex-row">
      <div class="flex-fill"></div>
      <div>
        <span class="m-2">Search :</span>
        <el-input size="small" style="width:168px"></el-input>
      </div>
    </div>
    <div class="w-100 border mt-1">
      <el-table :data="alarms" :row-class-name="tb_row_class" header border height="400">
        <el-table-column label="Time" prop="time" width="100" sortable></el-table-column>
        <el-table-column label="Code" prop="code" width="100" sortable></el-table-column>
        <el-table-column label="Description" prop="desc" sortable></el-table-column>
        <el-table-column label="Level" prop="level" width="100" sortable></el-table-column>
      </el-table>
    </div>
    <div class="w-100 mt-2">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alarms: [
        {
          time: '2022/10/20 19:00:00',
          code: '1234',
          desc: '[001]SoftwareEMS([001]軟體EMS)',
          level: 'Warning',

        },
        {
          time: '2022/10/20 21:00:00',
          code: '4444',
          desc: '[401]SoftwareEMS([401]軟體EMS)',
          level: 'Alarm',

        }
      ]
    }
  },
  methods: {
    tb_row_class(row, rowIndex) {
      if (row.rowIndex < 0) {
        return '';
      }
      var level = this.alarms[row.rowIndex].level;
      try {

        if (level == 'Warning') {
          return 'warning-row';
        } else if (level === 'Alarm') {
          return 'alarm-row';
        } else {
          return 'success-row';
        }
      } catch (error) {
        return 'success-row';
      }

    }
  },

}
</script>

<style>
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.el-table .warning-row {
  background-color: rgb(255, 237, 186);
  /* --el-table-tr-bg-color: var(--el-color-warning-light-9); */
}
.el-table .alarm-row {
  background-color: rgb(245, 198, 206);
}
</style>