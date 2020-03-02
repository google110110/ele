import JSON_DATA from '@/common/JSON.vue'
const Filter = {
    NUM(code){
        var foods=JSON_DATA.FOODS
        // console.log('NUM',foods,code)
        if(foods){
            for( var i=0;i<foods.length;i++){
                if(code.name==foods[i].name){
                    return foods[i].num
                }
            }
        }
        return code.num
    }
}
export default Filter;