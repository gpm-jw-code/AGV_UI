import axios from 'axios'
import param from '@/gpm_param'
var axios_entity = axios.create({
  baseURL: param.backend_host,
})
const VerticalControl = {
  Up: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Up`)
  },
  Down: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Down`)
  },
  Stop: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Stop`)
  },
  Resume: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Resume`)
  },
  Orig: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Orig`)
  },
  Init: async () => {
    var ret = await axios_entity.get(`api/VerticalControl/Init`)
  },
  Pose: async (target = 0.0) => {
    var ret = await axios_entity.get(
      `api/VerticalControl/Pose?target=${target}`,
    )
  },
}

export default VerticalControl
