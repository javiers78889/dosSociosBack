import { Sequelize } from "sequelize-typescript";
import Users from '../models/Users'
import Products from '../models/Products'
import Pedidos from "../models/Pedidos";
import dotenv from 'dotenv'

dotenv.config()


const databaseUrl= process.env.DATABASE_URL


const db = new Sequelize(databaseUrl,{
    dialect:'postgres',
    models:[Users,Products,Pedidos]
})

export default db;