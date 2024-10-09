import { Table, Column, Model, DataType} from "sequelize-typescript";

@Table({
    tableName: 'Users'
})
class Users extends Model {
    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true // Asegura que el nombre de usuario sea único
    })
    user!: string;
    
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    password!: string;

    @Column({
        type: DataType.STRING(50), // Longitud más razonable para teléfono
        allowNull: false
    })
    telefono!: string;

    @Column({
        type: DataType.STRING(255),
        allowNull: false,
        unique: true // Asegura que el correo sea único
    })
    correo!: string;
}

export default Users;
