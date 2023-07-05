import { createStore } from 'vuex'
import { Login } from '@/api/UserAPI';
import UserInfo from '@/ViewModels/UserInfo.js'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

export var UserStore = createStore({
   state:{
     UserState:{
      UserName:'OPERATOR',
      Role : 0
     }
   },
   getters:{
     CurrentUserName:state=>{
      if(state.UserState.UserName)
        return state.UserState.UserName;
      else 
        return 'OPERATOR'
     },
     IsGodUser:state=>{
      return state.UserState.Role == 3;
     },
     CurrentUserRole:state=>{
      return state.UserState.Role;
     }

   },
   mutations:{
    setUser(state,user_info){
      state.UserState = user_info
      localStorage.setItem('user', JSON.stringify(user_info) )
    }
   },
   actions:{
    async Login({commit},login_info){
      debugger
      var response_data = await Login(login_info)
      if (response_data != undefined) {
        var _UserInfo = new UserInfo(response_data.UserName, response_data.Role);
        commit('setUser',_UserInfo)
      }
      else{
        commit('setUser',{})
      }

      return response_data;
    },
    Logout({commit}){
      debugger
      commit('setUser',{ 
        UserName: 'OPERATOR',
        Role: 0
        }
      )
    }
   }
})