
export default {
    path:'/food',
    component:()=>import('@/views/food'),
    children:[
        {
            // path:'foodsDetails/:foodName',
            // component:()=>import('@/components/foodsDetails'),
            // props:{
            //     foodsDetails:true,
            // }

            // <router-view name="foodsDetails"/> 中的 name属性 与foodsDetails是对应关系
            //props /:后面的参数名是什么(foodsDetails) 参数名:true (foodsDetails:true)
            path:'foodsDetails/:foodMenu/:foodName',
            components:{
                foodsDetails:()=>import('@/components/foodsDetails')
            },
            props:{
                foodMenu:true,
                foodsDetails:true,
            }
        }
    ]
}