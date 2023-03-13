var param = {
  type: 'jw',
  // backend_host: 'http://192.168.0.103:7025',
  backend_host: 'https://localhost:7025',
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
