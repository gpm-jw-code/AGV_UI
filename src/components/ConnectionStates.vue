<template>
  <div class="connection-states w-100 px-1">
    <table class="w-100">
      <tbody>
        <tr>
          <td>
            <div>
              <i :class="'connected bi bi-circle-fill'"></i> UI Server
            </div>
          </td>
          <td>
            <div>
              <i v-bind:class="vms_state" class="bi bi-circle-fill"></i> VMS
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div>
              <i v-bind:class="rosbridge_state" class="bi bi-circle-fill"></i> ROS
            </div>
          </td>
          <td>
            <div>
              <i v-bind:class="wago_state" class="bi bi-circle-fill"></i> WAGO
            </div>
          </td>
        </tr>

        <!-- <tr>
          <td>
            <div :class="rosbridge_state">
              <i :class="'bi bi-circle-fill'"></i> ROSSSS
            </div>
          </td>
          <td>
            <div :class="agvc_state">
              <i class="bi bi-circle-fill"></i> AGVSSS
            </div>
          </td>
        </tr>-->
      </tbody>
    </table>
  </div>
</template>

<script>
import param from '@/gpm_param'
import WebSocketHelp from '@/api/WebSocketHepler'

export default {
  data() {
    return {
      ws: undefined,
      connections: {},

    }
  },
  computed: {
    rosbridge_state() {
      if (this.connections.RosbridgeServer != undefined)
        return this.connections.RosbridgeServer.toLocaleLowerCase()
      else
        return 'disconnect'
    },
    agvc_state() {
      if (this.connections.AGVC != undefined)
        return this.connections.AGVC.toLocaleLowerCase()
      else
        return 'disconnect'
    },
    vms_state() {
      if (this.connections.VMS != undefined)
        return this.connections.VMS.toLocaleLowerCase()
      else
        return 'disconnect'
    },
    wago_state() {
      if (this.connections.WAGO != undefined)
        return this.connections.WAGO.toLocaleLowerCase()
      else
        return 'disconnect'
    }
  },
  methods: {
    WebSocketConnect() {

      var _ws = new WebSocketHelp('ws/ConnectionState');
      _ws.Connect();
      _ws.onmessage = (ev) => {
        var data = JSON.parse(ev.data)
        this.connections = data;
      }
    }
  },
  mounted() {
    this.WebSocketConnect();
  },
}
</script>

<style lang ="scss">
.connection-states {
  .disconnect {
    color: red;
  }
  .connected {
    color: seagreen;
  }
  .connecting {
    color: yellow;
  }
  td div {
    text-align: left;
  }
}
</style>