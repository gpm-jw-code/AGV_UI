<template>
  <div class="status-card">
    <h4 class="text-start">狀態資訊</h4>
    <div class="w-100 border p-3">
      <table class="status-tb w-100">
        <tbody>
          <tr align="justify">
            <td>狀態</td>
            <td class="val-column">
              <b-button class="w-100" variant="warning">
                <b>Alarm</b>
              </b-button>
            </td>
            <td>CIM 狀態</td>
            <td class="val-column">4</td>
          </tr>
          <tr align="justify">
            <td>目前位置</td>
            <td class="val-column">
              <el-input disabled v-model="CurrentPosition"></el-input>
            </td>
            <td>目標位置</td>
            <td class="val-column">
              <el-input disabled v-model="currentPosition"></el-input>
            </td>
          </tr>
          <tr align="justify">
            <td>動作名稱</td>
            <td class="val-column">
              <el-input disabled v-model="currentPosition"></el-input>
            </td>
            <td>載物ID</td>
            <td class="val-column">
              <el-input disabled v-model="CarrierID"></el-input>
            </td>
          </tr>
          <tr align="justify">
            <td>異常</td>
            <td colspan="4">
              <el-input type="textarea" disabled v-model="CurrentPosition"></el-input>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- <el-form :inline="true">
        <el-form-item label="狀態">
          <b-button variant="warning">
            <b>Alarm</b>
          </b-button>
        </el-form-item>
        <el-form-item label="CIM狀態"></el-form-item>
      </el-form>
      <el-form :inline="true">
        <el-form-item label="目前位置">
          <el-input disabled></el-input>
        </el-form-item>
        <el-form-item label="目標位置">
          <el-input disabled></el-input>
        </el-form-item>
      </el-form>-->
    </div>
  </div>
</template>

<script>
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
    CurrentPosition() {
      if (this.ModuleInformation.nav_state == undefined) {
        return '-1';
      } else {
        return this.ModuleInformation.nav_state.lastVisitedNode;
      }
    },
    CarrierID() {
      if (this.ModuleInformation.CSTReader == undefined) {
        return '-1';
      } else {
        return this.ModuleInformation.CSTReader.data;
      }
    }
  },
  data() {
    return {
      currentPosition: '123'
    }
  },
}
</script>

<style lang="scss">
.status-card {
  h4 {
    font-weight: bold;
  }

  tr {
    height: 50px;
  }
  td {
    //width: 120px;
    font-weight: bold;
    font-size: small;
    padding: 0px 10px;
  }

  .status-tb {
    .val-column {
      width: 30%;
    }
  }
}
</style>