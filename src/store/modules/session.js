
import nested from './nested'
import { GetSessionList } from '../../api/session'

const state = () => ({
    sessionUserList: localStorage.getItem('sessionUserList') ? JSON.parse(localStorage.getItem('sessionUserList')) : []
})

const getters = {

}
const actions = {
    onGetSessionList({ commit }) {
        GetSessionList().then((response) => {
            if (response.code == 200) {
                console.log(response)
                commit("SET_SESSION_USER_LIST",response.data)
            }
        })
    }
}

const mutations = {
    SET_SESSION_USER_LIST(state, data) {
        localStorage.setItem('sessionUserList', JSON.stringify(data));
        state.sessionUserList = data;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
    modules: {
        nested
    }
}