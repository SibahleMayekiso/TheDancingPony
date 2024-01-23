import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

/**
 * Rating model
 *
 * @export
 * @class Rating
 * @extends {Model}
 */
export class Rating extends Model {
    public userId!: number;
    public dishId!: number;
    public rating!: number;
}

/**
 * Initializes the Rating model.
 *
 * @export
 */
export function initRating() {
    Rating.init({
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        dishId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: 'dishes',
                key: 'id'
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'ratings',
        sequelize: sequelize,
    });
}
