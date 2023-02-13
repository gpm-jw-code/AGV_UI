import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:7025'
const VerticalControl = {
  Up: async () => {
    var ret = await axios.get(`api/VerticalControl/Up`)
  },
  Down: async () => {
    var ret = await axios.get(`api/VerticalControl/Down`)
  },
  Stop: async () => {
    var ret = await axios.get(`api/VerticalControl/Stop`)
  },
  Resume: async () => {
    var ret = await axios.get(`api/VerticalControl/Resume`)
  },
  Orig: async () => {
    var ret = await axios.get(`api/VerticalControl/Orig`)
  },
  Init: async () => {
    var ret = await axios.get(`api/VerticalControl/Init`)
  },
  Pose: async (target = 0.0) => {
    var ret = await axios.get(`api/VerticalControl/Pose?target=${target}`)
  },
}

export default VerticalControl
