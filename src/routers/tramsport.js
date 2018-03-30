import applyCar from '../views/transport/applyCar.vue'
import auditCar from '../views/transport/auditCar.vue'
import auditCarIndex from '../views/transport/auditCarIndex.vue'
import carType from '../views/transport/carType.vue'
export const TRAMSPORT = [
	{
		path:'/applyCar',
		component: applyCar,
        name: 'applyCar'
    },
    {
        path:'/auditCar',
        component: auditCar,
        name: 'auditCar',
        children:[
            {
                name: 'auditCarIndex',
                path:'',
                component: auditCarIndex
            },
            {
                name: 'carType',
                path:'/carType',
                component: carType               
            }
        ]
    }
]