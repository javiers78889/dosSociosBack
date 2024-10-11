
import { Table, Column, Model, DataType } from "sequelize-typescript";


@Table({
    tableName: 'Pedidos'
})

class Pedidos extends Model {
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING(1000),
        allowNull: false
    })
    productosCantidad!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    total!: Number

    @Column({
        type: DataType.STRING(200),
        allowNull: false
    })
    telefono!: Number

    @Column({
        type: DataType.STRING(1000),
        allowNull: false
    })
    direccion!: string

    @Column({
        type: DataType.STRING(1000),
        allowNull: false
    })
    estado!: string


}


export default Pedidos