<template>
  <div class="djm-pio border rounded mx-1 py-3 px-5">
    <h3 class="border-bottom text-primary">{{ Owner }}</h3>
    <div v-for="pio in PIO_States" :key="pio.index">
      <div class="d-flex">
        <div class="signal-name">{{ pio.name }}</div>
        <el-tooltip
          placement="right"
          :content="pio.address+ (Editable?'(Double Click To Toggle)':'')"
        >
          <div
            @dblclick="SignalWriteChangeHandler(pio)"
            class="border signal-div rounded"
            v-bind:style="{ 
              backgroundColor: pio.state ==1?'rgb(0, 204, 0)': 'grey',
            }"
          >{{ pio.index }}</div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import { UserStore, DIOStore } from '@/store'
import { DIO } from '@/api/VMSAPI'
export default {
  props: {
    Owner: {
      type: String,
      default: 'AGV'
    },
  },
  data() {
    return {
      AGV_PIO: [
        {
          index: 0,
          name: 'VALID',
          state: 0,
          address: 'Y0020'
        },
        {
          index: 1,
          name: '',
          state: 0,
          address: 'Y0021'
        },
        {
          index: 2,
          name: '',
          state: 0,
          address: 'Y0022'
        },
        {
          index: 3,
          name: 'AGV READY',
          state: 0,
          address: 'Y0023'
        },
        {
          index: 4,
          name: 'TR_REQ',
          state: 0,
          address: 'Y0024'
        },
        {
          index: 5,
          name: 'BUSY',
          state: 0,
          address: 'Y0025'
        },
        {
          index: 6,
          name: 'COMPT',
          state: 0,
          address: 'Y0026'
        },
        {
          index: 7,
          name: '',
          state: 0,
          address: 'Y0027'
        },
      ],

      EQ_PIO: [
        {
          index: 0,
          name: 'L_REQ',
          state: 0,
          address: 'X0020'
        },
        {
          index: 1,
          name: 'U_REQ',
          state: 0,
          address: 'X0021'
        },
        {
          index: 2,
          name: '',
          state: 0,
          address: 'X0022'
        },
        {
          index: 3,
          name: 'READY',
          state: 0,
          address: 'X0023'
        },
        {
          index: 4,
          name: 'UP_READY',
          state: 0,
          address: 'X0024'
        },
        {
          index: 5,
          name: 'LOW_READY',
          state: 0,
          address: 'X0025'
        },
        {
          index: 6,
          name: 'EQ_BUSY',
          state: 0,
          address: 'X0026'
        },
        {
          index: 7,
          name: '',
          state: 1,
          address: 'X0027'
        },
      ]
    }
  },
  computed: {
    Editable() {
      return UserStore.getters.CurrentUserRole != 0
    },
    IsGodUse() {
      return UserStore.getters.IsGodUser;
    },
    PIO_States() {
      for (let index = 0; index < 8; index++) {
        this.AGV_PIO[index].state = DIOStore.getters.E84_AGV[index]
        this.EQ_PIO[index].state = DIOStore.getters.E84_EQ[index]
        if (DIOStore.getters.IsE84UseEmu) {
          this.EQ_PIO[index].address = `Y000${index}`
        }
      }
      return this.Owner == 'AGV' ? this.AGV_PIO : this.EQ_PIO
    },
    E84_AGV() {
      return DIOStore.getters.E84_AGV
    }
  },
  methods: {

    async SignalWriteChangeHandler(pio = { index: 7, name: '', state: 1, address: 'X0027' }) {
      if (!this.Editable)
        return;
      if (this.Owner != 'AGV') {
        if (!DIOStore.getters.IsE84UseEmu)
          return;
      }
      await DIO.DO_State_Change(pio.address, pio.state == 0)
    }
  },
}
</script>

<style lang="scss" scoped>
.djm-pio {
}
h3 {
  //   padding-left: 100px;
  padding-bottom: 10px;
}
.signal-div {
  width: 60px;
  height: 60px;
  padding: 15px;
  color: white;
  cursor: pointer;
}
.signal-name {
  width: 100px;
  padding-top: 15px;
  padding-right: 10px;
  text-align: right;
  font-weight: bold;
}
</style>