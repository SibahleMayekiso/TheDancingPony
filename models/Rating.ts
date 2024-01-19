import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";

class Rating extends Model {
    public userId!: number;
    public dishId!: number;
    public rating!: number;
}

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
