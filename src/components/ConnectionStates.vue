<template>
  <div class="connection-states w-100 px-1">
    <table class="w-100">
      <tbody>
        <tr>
          <td>
            <div class="connected">
              <i :class="'bi bi-circle-fill'"></i> UI Server
            </div>
          </td>
          <!-- <td>
            <div :class="agvc_state">
              <i class="bi bi-circle-fill"></i> AGVC
            </div>
          </td>-->
        </tr>
        <tr>
          <td>
            <div :class="rosbridge_state">
              <i :class="'bi bi-circle-fill'"></i> ROS
            </div>
          </td>
          <td>
            <div :class="agvc_state">
              <i class="bi bi-circle-fill"></i> VMS
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
    }
  },
  methods: {
    WebSocketConnect() {

      var _ws = new WebSocket(`${param.backend_host.replace('http', 'ws')}/ws/ConnectionState`)
      _ws.onopen = (ws) => {
        console.log('opened');
        _ws.onmessage = (ws, ev) => {
          var data = JSON.parse(ws.data)
          this.connections = data;
        }
      }
      _ws.onclose = () => {
        this.connections.RosbridgeServer = this.connections.AGVC = 'DISCONNECT';
        this.WebSocketConnect();
        console.log('ws/ConnectionState close');
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

  td div {
    text-align: left;
  }
}
</style>