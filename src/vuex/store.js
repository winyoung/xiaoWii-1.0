import vue from 'vue'
import vuex from 'vuex'
import Vue from 'vue';

Vue.use(vuex)

var store = new vuex.Store({
    state:{
        isShow:true
    },
    mutations : {
        toggleShow(state, val){
            state.isShow = val.isShow;
        }
    }
})
export default store