<template>
  <div class="alarm-warn-table px-1">
    <div class="d-flex flex-row">
      <div class="flex-fill text-start">
        <b-button size="sm" @click="AlarmDownload">{{$t('refresh')}}</b-button>
        <b-button
          v-if="clear_alarm_btn_visible"
          variant="danger"
          @click="ClearAlarmAlert()"
          size="sm"
        >{{ $t('clear_alarm_records') }}</b-button>
      </div>
      <div>
        <span class="m-2">Search :</span>
        <el-input size="small" style="width:168px"></el-input>
      </div>
    </div>

    <div class="w-100 mt-2">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalAlarmNum"
        :page-size="page_size"
        v-model="page"
        @current-change="PageChangeHandler"
      />
    </div>
    <div class="w-100 border mt-1">
      <el-table
        v-loading="table_loading"
        :data="alarms"
        row-key="Time"
        :row-class-name="tb_row_class"
        header
        border
        height="550"
        size="small"
      >
        <el-table-column label="Time" prop="Time" width="160" :formatter="TimeFormmter"></el-table-column>
        <el-table-column label="Code" prop="Code" width="90" header-align="center">
          <template #default="{row}">
            <div class="text-center">{{ row.Code }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Description" :prop="lang=='zh-TW'?'CN':'Description'"></el-table-column>
        <el-table-column label="Level" prop="Level" width="100" header-align="center">
          <template #default="{row}">
            <div class="text-center">
              <b>{{ row.Level }}</b>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <b-modal
      v-model="clear_alarms_dialog_show"
      centered
      title="Alarm Records Clear"
      @ok="ClearAlarmRecords"
    >
      <p>確定要清除異常紀錄?</p>
    </b-modal>
  </div>
</template>

<script>
import { AlarmTableAPI } from '@/api/VMSAPI';
import moment from 'moment';
import bus from '@/event-bus.js'
import Notifier from '@/api/NotifyHelper';
import { UserStore } from '@/store'
export default {
  data() {
    return {
      alarms: [],
      totalAlarmNum: 0,
      page: 1,
      page_size: 15,
      table_loading: false,
      lang: 'zh-TW',
      clear_alarms_dialog_show: false,

    }
  },
  methods: {
    tb_row_class(row, rowIndex) {
      if (row.rowIndex < 0) {
        return '';
      }
      var level = this.alarms[row.rowIndex].Level;
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

    },
    TimeFormmter(row, column, cellValue, index) {
      return moment(cellValue).format('yyyy/MM/DD HH:mm:ss');
    },
    async PageChangeHandler(page) {
      this.page = page;
      this.AlarmDownload();
    },
    async AlarmDownload() {
      this.table_loading = true;
      this.totalAlarmNum = await AlarmTableAPI.TotalAlarmCount()
      this.alarms = await AlarmTableAPI.QueryByPage(this.page, this.page_size);
      this.table_loading = false;
    },
    ClearAlarmAlert() {
      this.$swal.fire({
        title: 'Alert Clear',
        text: `${this.$t('clear-alarm-data-confirm-text')}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'OK',
        customClass: 'my-sweetalert'
      }).then((result) => {
        if (result.isConfirmed) {
          this.ClearAlarmRecords();
        }
      })

    },
    async ClearAlarmRecords() {
      await AlarmTableAPI.ClearAlarms();
      Notifier.Success("Alarm Clear", "bottom", 1000);
      await this.AlarmDownload();
    }
  },
  computed: {
    clear_alarm_btn_visible() {
      return UserStore.getters.CurrentUserRole != 0
    }
  },
  async mounted() {
    this.AlarmDownload();
    bus.on('/alarmtable_tab_click', async () => {
      this.AlarmDownload();
    });
    bus.on('/lang_changed', (locale) => {
      this.lang = locale
    })
  }
}
</script>

<style  lang="scss">
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