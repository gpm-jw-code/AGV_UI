import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:7025'

export async function EMO() {
  var ret = await axios.post('api/VMS/EMO')
  return ret
}

export async function Initialize() {
  var ret = await axios.post('api/VMS/Initialize')
  return ret
}
export async function ResetAlarm() {
  var ret = await axios.post('api/VMS/ResetAlarm')
  return ret
}
export async function BuzzerOff() {
  var ret = await axios.post('api/VMS/BuzzerOff')
  return ret
}
export async function RemoveCassette() {
  var ret = await axios.post('api/VMS/RemoveCassette')
  return ret
}

/**車體移動-UP */
export async function AGVMove_UP() {
  var ret = await axios.get('api/ManualOperator/Forward')
  return ret
}

/**車體移動-DOWN */
export async function AGVMove_DOWN() {
  var ret = await axios.get('api/ManualOperator/Backward')
  return ret
}
/**車體移動-LEFT */
export async function AGVMove_LEFT() {
  var ret = await axios.get('api/ManualOperator/Left')
  return ret
}

/**車體移動-RIGHT */
export async function AGVMove_RIGHT() {
  var ret = await axios.get('api/ManualOperator/Right')
  return ret
}

/**車體移動-STOP */
export async function AGVMove_STOP() {
  var ret = await axios.get('api/ManualOperator/Stop')
  return ret
}

/**GetModuleInformation */
export async function GetModuleInformation() {
  var ret = await axios.get('api/VMS')
  return ret.data
}

/**GetBatteryState */
export async function GetBatteryState() {
  var ret = await axios.get('api/VMS/BateryState')
  return ret.data
}

/**GetMileage */
export async function GetMileage() {
  var ret = await axios.get('api/VMS/Mileage')
  return ret.data
}
