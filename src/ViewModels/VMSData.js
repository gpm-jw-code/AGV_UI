import clsDriverState from './clsDriverState'
import BatteryStatus from './BatteryStatus'
class VMSData {
  Agv_Type = 0
  Simulation = false
  MainState = 'DOWN'
  IsInitialized = false
  IsSystemIniting = false
  OnlineMode = 0
  AutoMode = 0
  CarName = 'AGV_'
  AGVC_ID = -1
  CST_Data = ''
  Tag = -1
  BatteryStatus = new BatteryStatus()
  Mileage = 0
  Pose = {
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    orientation: {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    },
  }
  BCR_State_MoveBase = {
    state: 0,
    tagID: 0,
    xValue: 0.0,
    yValue: 0.0,
    theta: 0.0,
  }
  NavInfo = {
    Destination: '',
    Speed_max_limit: -1,
  }
  MapComparsionRate = -1
  AlarmCodes = []
  NewestAlarm = undefined
  AGV_Direct = 'STOP'
  ZAxisDriverState = new clsDriverState()
  ZAxisActionName = ''
  DriversStates = new Array() < clsDriverState > 0
  Laser_Mode = 0
  UltrSensorState = new UltrasonicSensorState()
  IsAGVPoseError = false
  Current_LASER_MODE = 'Bypass'
  LightsStates = {
    Front: false,
    Back: false,
    Right: false,
    Left: false,
    Run: false,
    Down: false,
    Idle: false,
    Online: false,
  }
}

export class UltrasonicSensorState {
  state = 1
  errorCode = 1
  errorString = '通訊異常'
  dirFront = 0
  dirRear = 0
  dirLeft = 0
  dirRight = 0
}

export class AlarmCode {
  Code = 0
  Description = ''
  CN = ''
  EAlarmCode = 0
}

export default VMSData
