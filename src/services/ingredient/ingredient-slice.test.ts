import ingredientReducer, {getIngredientInfo, deleteIngredientInfo} from "./ingredient-slice";

describe("ingredientSlice", () => {
    const mockIngredient = {
        _id: "123",
        name: "Test",
        type: "Test",
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 4,
        price: 5,
        image: "6",
        image_mobile: "7",
        image_large: "8",
        __v: 8
    }

    it('should return default state when passed an empty action', function () {
        const result = ingredientReducer(undefined, { type: "" })

        expect(result).toEqual({ ingredient: undefined });
    });

    it('should get ingredient info with "getIngredientInfo" action', function () {
        const action = {type: getIngredientInfo.type, payload: mockIngredient}
        const result = ingredientReducer({ ingredient: undefined }, action)

        expect(result.ingredient?.name).toBe("Test");
        expect(result.ingredient?.price).toBe(5);
    });

    it('should delete ingredient info with "deleteIngredientInfo" action', function () {
        const action = {type: deleteIngredientInfo.type}
        const result = ingredientReducer({ ingredient: mockIngredient }, action)

        expect(result).toEqual({ ingredient: undefined });
    });
})