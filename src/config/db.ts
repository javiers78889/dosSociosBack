import { Sequelize } from "sequelize-typescript";
import Users from '../models/Users'
import Products from '../models/Products'


const databaseUrl= 'postgresql://dossocios_user:FfmhkOlmWHH2DwQursgHBnJgxshxBmZR@dpg-crsq0pu8ii6s73eftgfg-a.oregon-postgres.render.com/dossocios?ssl=true'


const db = new Sequelize(databaseUrl,{
    dialect:'postgres',
    models:[Users,Products]
})

export default db;