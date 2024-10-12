import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: 'Products'
})

class Products extends Model {
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name!: string;

    @Column({
        type: DataType.STRING(500),
        allowNull: false
    })
    description!: String;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    cantidad!: Number
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    precio!: Number

    @Column({
        type: DataType.STRING(1000),
        allowNull: true
    })
    imagen!: string; // Almacena la imagen como datos binarios

}

export default Products