import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

/**
 * Dish model
 *
 * @export
 * @class Dish
 * @extends {Model}
 */
export class Dish extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public price!: number;
    public image!: string;
}

/**
 * Initializes the Dish model.
 *
 * @export
 */
export function initDish() {
    Dish.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        description: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        image: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: 'dishes',
        sequelize: sequelize,
    });
}
