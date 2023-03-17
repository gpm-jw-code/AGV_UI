import param from '@/gpm_param'
var backend_ws_host = param.backend_host.replace('http', 'ws')

class WebSocketHelp {
  constructor(ws_path, ws_host) {
    this.ws_path = ws_path
    if (ws_host == undefined) {
      this.ws_url = `${backend_ws_host}/${this.ws_path}`
    } else {
      this.ws_url = `${ws_host}/${this.ws_path}`
    }
  }

  Connect() {
    console.info(`Try Connect to : ${this.ws_url}`)
    const socket = new WebSocket(`${this.ws_url}`)
    socket.onopen = () => {
      console.info('ws opened')
      this.SendAliveCheck()
    }
    // socket.onmessage = (event) => {
    //   var Data = JSON.parse(event.data)

    //   console.info(`Data Receievd : ${Data}`)
    // }
    // socket.onclose = () => {
    //   console.info('ws clsoed')
    // }
    // socket.onerror = () => {
    //   console.info('ws error')
    // }
    console.info('123')
    this.wssocket = socket
  }

  Close() {
    if (this.wssocket) {
      this.wssocket.close()
    }
  }

  SendAliveCheck() {
    setInterval(() => {
      this.wssocket.send('alive')
    }, 1000)
  }
}

export default WebSocketHelp
