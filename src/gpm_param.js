var param = {
  type: 'jw',
  // backend_host: 'http://192.168.0.103:7025',
  get backend_host() {
    if (process.env.NODE_ENV == 'development') {
      return 'http://10.0.1.2:7025'
      // return 'http://192.168.0.101:7025'
    } else {
      return `${window.location.protocol}//${window.location.host}`
    }
  },
}
export const version = '23.5.24.1'
export default param
