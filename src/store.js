import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  currentUerName: '',
  selectUserName: '',
  selectAdminName: '',
  AspectAdminName: '',
  DischargeGumbel: '',
  sestetNumberName: '',
  sestetNameName: '',
  setsquareDeptName: '',
  sensorsNumberName: '',
  sestetTypeName: '',
  sepoyTypeName: '',
  ip: 'http://192.168.1.100:8080/',
  formerNumberName: '',
  forwardestName: '',
  forwarderDept: '',
  forwardersNumberName: '',
  forwarderTypeName: '',
  setAdminGamepadId: ''
}
const mutations = {
  setAdminGamepadId (state, value) {
    state.setAdminGamepadId = value
  },
  forwarderTypeName (state, value) {
    state.forwarderTypeName = value
  },
  forwardersNumberName (state, value) {
    state.forwardersNumberName = value
  },
  forwarderDept (state, value) {
    state.forwarderDept = value
  },
  forwardestName (state, value) {
    state.forwardestName = value
  },
  formerNumberName (state, value) {
    state.formerNumberName = value
  },
  setIp (state, value) {
    state.ip = value
  },
  setUserName (state, value) {
    state.currentUerName = value
  },
  setSelectUserName (state, value) {
    state.selectUserName = value
  },
  setSelectAdminName (state, value) {
    state.selectAdminName = value
  },
  AspectAdminName (state, value) {
    state.AspectAdminName = value
  },
  DischargeGumbel (state, value) {
    state.DischargeGumbel = value
  },
  sestetNumberName (state, value) {
    state.sestetNumberName = value
  },
  sestetNameName (state, value) {
    state.sestetNameName = value
  },
  setsquareDeptName (state, value) {
    state.setsquareDeptName = value
  },
  sensorsNumberName (state, value) {
    state.sensorsNumberName = value
  },
  sestetTypeName (state, value) {
    state.sestetTypeName = value
  },
  sepoyTypeName (state, value) {
    state.sepoyTypeName = value
  }
}
const actions = {
  setAdminGamepadId: ({ commit }, value) => {
    commit('setAdminGamepadId', value)
  },
  forwarderTypeName: ({ commit }, value) => {
    commit('forwarderTypeName', value)
  },
  forwardersNumberName: ({ commit }, value) => {
    commit('forwardersNumberName', value)
  },
  forwarderDept: ({ commit }, value) => {
    commit('forwarderDept', value)
  },
  forwardestName: ({ commit }, value) => {
    commit('forwardestName', value)
  },
  formerNumberName: ({ commit }, value) => {
    commit('formerNumberName', value)
  },
  setIpHost: ({ commit }, value) => {
    commit('setIp', value)
  },
  setUserNameAction: ({ commit }, value) => {
    commit('setUserName', value)
  },
  setUserName: ({ commit }, value) => {
    commit('setSelectUserName', value)
  },
  setAdminName: ({ commit }, value) => {
    commit('setSelectAdminName', value)
  },
  AspectAdminName: ({ commit }, value) => {
    commit('AspectAdminName', value)
  },
  DischargeGumbel: ({ commit }, value) => {
    commit('DischargeGumbel', value)
  },
  sestetNumberName: ({ commit }, value) => {
    commit('sestetNumberName', value)
  },
  sestetNameName: ({ commit }, value) => {
    commit('sestetNameName', value)
  },
  setsquareDeptName: ({ commit }, value) => {
    commit('setsquareDeptName', value)
  },
  sensorsNumberName: ({ commit }, value) => {
    commit('sensorsNumberName', value)
  },
  sestetTypeName: ({ commit }, value) => {
    commit('sestetTypeName', value)
  },
  sepoyTypeName: ({ commit }, value) => {
    commit('sepoyTypeName', value)
  }
}
const getters = {
  setAdminGamepadId (state) {
    return state.setAdminGamepadId
  },
  forwarderTypeName (state) {
    return state.forwarderTypeName
  },
  forwardersNumberName (state) {
    return state.forwardersNumberName
  },
  forwarderDept (state) {
    return state.forwarderDept
  },
  forwardestName (state) {
    return state.forwardestName
  },
  formerNumberName (state) {
    return state.formerNumberName
  },
  sepoyTypeName (state) {
    return state.sepoyTypeName
  },
  ipHost (state) {
    return state.ip
  },
  getUserName (state) {
    return state.currentUerName
  },
  selectUserName (state) {
    return state.selectUserName
  },
  selectAdminName (state) {
    return state.selectAdminName
  },
  AspectAdminName (state) {
    return state.AspectAdminName
  },
  DischargeGumbel (state) {
    return state.DischargeGumbel
  },
  sestetNumberName (state) {
    return state.sestetNumberName
  },

  sestetNameName (state) {
    return state.sestetNameName
  },
  setsquareDeptName (state) {
    return state.setsquareDeptName
  },
  sestetTypeName (state) {
    return state.sestetTypeName
  },
  sensorsNumberName (state) {
    return state.sensorsNumberName
  }

}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
