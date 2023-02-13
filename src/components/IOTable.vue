<template>
  <div class="px-5">
    <div class="d-flex flex-row">
      <div class="flex-fill"></div>
      <div>
        <span class="m-2">Search :</span>
        <el-input size="small" style="width:168px"></el-input>
      </div>
    </div>
    <div class="w-100 border mt-1">
      <el-table
        size="small"
        :data="table_data"
        :row-class-name="tb_row_class"
        header
        border
        height="550"
      >
        <el-table-column label="Addr" prop="addr" width="100"></el-table-column>
        <el-table-column label="Name" prop="name"></el-table-column>
        <el-table-column label="Value" prop="value" width="100"></el-table-column>
      </el-table>
    </div>
    <div class="w-100 mt-2">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    table_data: {
      type: Array,
      default() {
        return [{
          addr: '1',
          name: 'abc',
          value: 0
        },
        ]
      }
    },
  },
  methods: {
    tb_row_class(row, rowIndex) {
      if (row.rowIndex < 0) {
        return '';
      }
      var value = this.table_data[row.rowIndex].value;
      console.info(value);
      try {
        if (value == 0) {
          return 'off-row';
        } else {
          return 'on-row';
        }

      } catch (error) {
        return 'off-row';
      }
    }
  },
}
</script>

<style  lang="scss">
.el-table .on-row {
  background-color: rgb(195, 229, 202);
  /* --el-table-tr-bg-color: var(--el-color-success-light-9); */
}
</style>