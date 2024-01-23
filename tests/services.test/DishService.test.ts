import { Op } from "sequelize";
import { Dish } from "../../models/Dish";
import { Rating } from "../../models/Rating";
import { DishService } from "../../services/DishService";
import sequelize from "../../database/database";

describe('DishService', () => {
    let dishService: DishService;

    beforeEach(() => {
        dishService = new DishService(Dish);
    });

    afterAll(() => {
        sequelize.close();
    })

    describe('createDish', () => {
        it('creates a new dish', async () => {
            //Arrange
            const mockDish = {
                name: 'Test Dish',
                description: 'delicious',
                price: 10,
                image: 'test.jpg'
            };

            Dish.create = jest.fn().mockReturnValue(mockDish);
            const expected = mockDish;

            //Act
            const actual = await dishService.createDish(mockDish.name, mockDish.description, mockDish.price, mockDish.image);

            //Assert
            expect(Dish.create).toHaveBeenCalledWith(mockDish);
            expect(actual).toEqual(expected);
        });
    });

    describe('findAllDishes', () => {
        it('finds all dishes', async () => {
            //Arrange
            const mockDishes = [
                { name: 'Test Dish 1' },
                { name: 'Test Dish 2' },
            ];

            Dish.findAll = jest.fn().mockResolvedValue(mockDishes);
            const expected = mockDishes

            //Act
            const actual = await dishService.findAllDishes()

            //Assert
            expect(Dish.findAll).toHaveBeenCalled();
            expect(actual).toEqual(expected);
        });
    });

    describe('updateDish', () => {
        it('updates an existing dish', async () => {
            //Arrange
            const mockDish = {
                id: 1,
                name: 'Test Dish',
                description: 'delicious',
                price: 10,
                image: 'test.jpg',
                update: jest.fn().mockResolvedValue(undefined)
            };

            Dish.findByPk = jest.fn().mockResolvedValue(mockDish);
            // mockDish.update = jest.fn().mockResolvedValue(mockDish);

            const expected = mockDish;

            //Act
            const actual = await dishService.updateDish(mockDish.id, mockDish.name, mockDish.description, mockDish.price, mockDish.image);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(mockDish.id);
            // expect(mockDish.update).toHaveBeenCalledWith({ name: mockDish.name, description: mockDish.description, price: mockDish.price, image: mockDish.image });
            expect(actual).toEqual(expected);
        });

        it('returns null if the dish does not exist', async () => {
            //Arrange
            Dish.findByPk = jest.fn().mockResolvedValue(null);

            //Act
            const actual = await dishService.updateDish(1, 'Test Dish', 'Delicious', 10, 'test.jpg');

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(1);
            expect(actual).toBeNull();
        });
    });

    describe('deleteDish', () => {
        it('deletes a dish if it exists', async () => {
            //Arrange
            const mockDish = { id: 1, destroy: jest.fn().mockResolvedValue(undefined) };
            Dish.findByPk = jest.fn().mockResolvedValue(mockDish);
            const expected = true;

            //Act
            const actual = await dishService.deleteDish(mockDish.id);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(mockDish.id);
            expect(mockDish.destroy).toHaveBeenCalled();
            expect(actual).toBe(expected);

        });

        it('returns false if the dish does not exist', async () => {
            //Arrange
            Dish.findByPk = jest.fn().mockResolvedValue(null);
            const expected = false;

            //Act
            const actual = await dishService.deleteDish(1);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(1);
            expect(actual).toBe(expected);
        });
    });

    describe('findByPk', () => {
        it('finds a dish by primary key', async () => {
            //Arrange
            const mockDish = {
                id: 1,
                name: 'Test Dish',
                description: 'delicious',
                price: 10,
                image: 'test.jpg'
            };
            Dish.findByPk = jest.fn().mockResolvedValue(mockDish);
            const expected = mockDish;

            //Act
            const actual = await dishService.findByPk(mockDish.id);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(mockDish.id);
            expect(actual).toEqual(expected);
        });
    });

    describe('searchDishes', () => {
        it('searches dishes by query', async () => {
            //Arrange
            const mockDishes = [{ name: 'Test Dish 1' }, { name: 'Test Dish 2' }];
            const query = '%Test%';
            Dish.findAll = jest.fn().mockResolvedValue(mockDishes);
            const expected = mockDishes;

            //Act
            const actual = await dishService.searchDishes(query);

            //Assert
            expect(Dish.findAll).toHaveBeenCalledWith({ where: { name: { [Op.iLike]: `%${query}%` } } });
            expect(actual).toEqual(expected);
        });
    });

    describe('rateDishById', () => {
        it('rates a dish if it exists', async () => {
            //Arrange
            const mockDish = { id: 1 };
            const mockRating = { userId: 1, dishId: mockDish.id, rating: 5 };
            Dish.findByPk = jest.fn().mockResolvedValue(mockDish);
            Rating.upsert = jest.fn().mockResolvedValue([mockRating, true]);

            //Act
            const [userRating, isRatingCreated] = await dishService.rateDishById(mockRating.userId, mockRating.dishId, mockRating.rating);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(mockDish.id);
            expect(Rating.upsert).toHaveBeenCalledWith(
                { userId: mockRating.userId, dishId: mockRating.dishId, rating: mockRating.rating },
                { returning: true }
            );
            expect(userRating).toEqual(mockRating);
            expect(isRatingCreated).toBe(true);
        });

        it('returns null and false if the dish does not exist', async () => {
            //Arrange
            Dish.findByPk = jest.fn().mockResolvedValue(null);

            //Act
            const [userRating, isRatingCreated] = await dishService.rateDishById(1, 1, 5);

            //Assert
            expect(Dish.findByPk).toHaveBeenCalledWith(1);
            expect(userRating).toBeNull();
            expect(isRatingCreated).toBe(false);
        });
    });
});