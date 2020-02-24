import Vue from 'vue';
import Vuex from 'vuex';
// lib/utils.js 
// const Nint= (play) =>{
const Nint = function(play){
    var play2=[]
    var play=play
    play.forEach((item,index) => {
            if(item.num>0){
                play2.push(item)
            }
        });
        return play2
}
export default{
    Nint
}