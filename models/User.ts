import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

/**
 * User model
 *
 * @export
 * @class User
 * @extends {Model}
 */
export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: string;
}

/**
 * Initializes the User model.
 *
 * @export
 */
export function initUser() {
    User.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: 'users',
        sequelize: sequelize,
    });
}
