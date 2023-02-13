<template>
  <div class="agv-control d-flex">
    <div style="width:200px">
      <el-form label-position="top">
        <el-form-item label="Tag ID">
          <el-input disabled v-model="TagID"></el-input>
        </el-form-item>
        <div class="row">
          <el-form-item class="col-6" label="X">
            <el-input disabled></el-input>
          </el-form-item>
          <el-form-item class="col-6" label="Y">
            <el-input disabled></el-input>
          </el-form-item>
        </div>
        <el-form-item label="Angles">
          <el-input disabled></el-input>
        </el-form-item>

        <div class="row">
          <el-form-item class="col-6" label="Linear X">
            <el-input disabled></el-input>
          </el-form-item>
          <el-form-item class="col-6" label="Angular Z">
            <el-input disabled></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="keys pt-4 p-3" style="width:400px">
      <table class="w-100">
        <tbody>
          <tr align="center">
            <td>
              <div></div>
            </td>
            <td>
              <div @click="MOVE_UP()">
                <i class="bi bi-arrow-up"></i>
              </div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
          <tr align="justify">
            <td>
              <div @click="MOVE_LEFT()">
                <i class="bi bi-arrow-left"></i>
              </div>
            </td>
            <td>
              <div @click="MOVE_STOP()" style="border:none">
                <i class="bi bi-sign-stop"></i>
              </div>
            </td>
            <td>
              <div @click="MOVE_RIGHT()">
                <i class="bi bi-arrow-right"></i>
              </div>
            </td>
          </tr>
          <tr align="justify">
            <td>
              <div></div>
            </td>
            <td>
              <div @click="MOVE_DOWN()">
                <i class="bi bi-arrow-down"></i>
              </div>
            </td>
            <td>
              <div></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { AGVMove_UP, AGVMove_DOWN, AGVMove_LEFT, AGVMove_RIGHT, AGVMove_STOP } from '@/api/AGVS';
export default {
  props: {
    ModuleInformation: {
      type: Object,
      default() {
        return {

        }
      }
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
    async MOVE_UP() {
      await AGVMove_UP();
    },
    async MOVE_DOWN() {
      await AGVMove_DOWN();
    },
    async MOVE_LEFT() {
      await AGVMove_LEFT();
    },
    async MOVE_RIGHT() {
      await AGVMove_RIGHT();
    },
    async MOVE_STOP() {
      await AGVMove_STOP();
    }
  },
}
</script>

<style scoped lang="scss">
.agv-control {
  table {
    td {
      div {
        background-color: rgb(202, 202, 202);
        margin: 5px;
        width: 90%;
        text-align: center;
        height: 80px;
        border-radius: 3px;
        border: 1px solid grey;
        i {
          font-size: 50px;
          position: relative;
          top: 5px;
        }
        &:active {
          background-color: red;
          color: white;
        }
      }
    }
  }
}
</style>
