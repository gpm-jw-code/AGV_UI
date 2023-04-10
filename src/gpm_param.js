var param = {
  type: 'jw',
  // backend_host: 'http://192.168.0.103:7025',
  get backend_host() {
    console.log(process.env.NODE_ENV)
    console.log(window.location.host)
    console.log(window.location.protocol)
    if (process.env.NODE_ENV == 'development') {
      return 'http://localhost:7025'
    } else {
      return `${window.location.protocol}//${window.location.host}`
    }
  },
}
class golbal_data {
  test = 1
  get test() {
    return this.test
  }
  set test(val) {
    this.test = val
  }
}
export let my_data = new golbal_data()

export const version = '1.0.0'
export default param
