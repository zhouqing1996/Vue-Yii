import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export  default new Vuex.Store({

  state:{
    // //name
    // Name:localStorage.getItem('Name')?localStorage.getItem('Name'):'',
    // //password
    // Password:localStorage.getItem('Password')?localStorage.getItem('Password'):'',
    // //  token
    // Token:localStorage.getItem('Token')?localStorage.getItem('Token'):'',
    // //role
    // Role:localStorage.getItem('Role')?localStorage.getItem('Role'):'',
    // //status
    // Status:localStorage.getItem('Status')?localStorage.getItem('Status'):'',
    //全局变量
    Name:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Name']:"",
    Pwd:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Pwd']:"",
    Token:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Token']:"",
    Role:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Role']:"",
    Status:JSON.parse(localStorage.getItem("vuex"))?JSON.parse(localStorage.getItem("vuex"))['Status']:"",

    sName:JSON.parse(sessionStorage.getItem("vuex"))?JSON.parse(sessionStorage.getItem("vuex"))['sName']:"",
    sPwd:JSON.parse(sessionStorage.getItem("vuex"))?JSON.parse(sessionStorage.getItem("vuex"))['sPwd']:"",
    sToken:JSON.parse(sessionStorage.getItem("vuex"))?JSON.parse(sessionStorage.getItem("vuex"))['sToken']:"",
    sRole:JSON.parse(sessionStorage.getItem("vuex"))?JSON.parse(sessionStorage.getItem("vuex"))['sRole']:"",
    sStatus:JSON.parse(sessionStorage.getItem("vuex"))?JSON.parse(sessionStorage.getItem("vuex"))['sStatus']:"",

    isLogin:false

  },
  mutations:{
    userStatus(state, flag) {
      state.isLogin = flag
    },
    //set方法
    setName:function (state,name) {
      state.Name = name;
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    setPwd:function (state,pwd) {
      state.Pwd = pwd;
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    setToken:function (state,token) {
      state.Token = token;
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    setRole:function (state,role) {
      state.Role = role;
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    setStatus:function (state,status) {
      state.Status = status;
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    delName(state)
    {
      state.Name = "";
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    delPwd(state)
    {
      state.Pwd = "";
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    delToken(state)
    {
      state.Token = "";
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    delRole(state)
    {
      state.Role = "";
      localStorage.setItem("vuex",JSON.stringify(state))
    },
    delStatus(state)
    {
      state.Status = "";
      localStorage.setItem("vuex",JSON.stringify(state))
    },

    setsName:function (state,name) {
      state.sName = name;
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    setsPwd:function (state,pwd) {
      state.sPwd = pwd;
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    setsToken:function (state,token) {
      state.sToken = token;
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    setsRole:function (state,role) {
      state.sRole = role;
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    setsStatus:function (state,status) {
      state.sStatus = status;
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    delsName(state)
    {
      state.sName = "";
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    delsPwd(state)
    {
      state.sPwd = "";
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    delsToken(state)
    {
      state.sToken = "";
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    delsRole(state)
    {
      state.sRole = "";
      sessionStorage.setItem("vuex",JSON.stringify(state))
    },
    delsStatus(state)
    {
      state.sStatus = "";
      sessionStorage.setItem("vuex",JSON.stringify(state))
    }
  },
  getters:{
    isLogin: state => state.isLogin,
    //get方法
    getName:(state)=>{
      return state.Name
    },
    getPwd:(state)=>{
      return state.Pwd
    },
    getToken:(state)=>{
      return state.Token
    },
    getRole:(state)=>{
      return state.Role
    },
    getStatus:(state)=>{
      return state.Status
    },

    getsName:(state)=>{
      return state.sName
    },
    getsPwd:(state)=>{
      return state.sPwd
    },
    getsToken:(state)=>{
      return state.sToken
    },
    getsRole:(state)=>{
      return state.sRole
    },
    getsStatus:(state)=>{
      return state.sStatus
    }
  },
  actions:{
    //获取登录状态
    userLogin({commit}, flag) {
      commit("userStatus", flag)
    },
    login:({commit},obj)=>{
      commit('setName',obj.username),commit('setPwd',obj.password),
      commit('setToken',obj.token),commit('setRole',obj.role),
      commit('setStatus',obj.status)
    },
    logout:({commit})=>{
      commit('delName'),commit('delPwd'),
      commit('delToken'),commit('delRole'),
      commit('delStatus')
    },
    forget:({commit},obj)=>{
      commit('setName',obj.username),commit('setPwd',obj.password),
      commit('setToken',obj.token),commit('setRole',obj.role),
      commit('setStatus',obj.status)
    },

    slogin:({commit},obj)=>{
      commit('setsName',obj.username),commit('setsPwd',obj.password),
        commit('setsToken',obj.token),commit('setsRole',obj.role),
        commit('setsStatus',obj.status)
    },
    slogout:({commit})=>{
      commit('delsName'),commit('delsPwd'),
        commit('delsToken'),commit('delsRole'),
        commit('delsStatus')
    },
    sforget:({commit},obj)=>{
      commit('setsName',obj.username),commit('setsPwd',obj.password),
        commit('setsToken',obj.token),commit('setsRole',obj.role),
        commit('setsStatus',obj.status)
    },
  }
});

