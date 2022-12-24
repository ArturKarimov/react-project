import ingredientsReducer, {setIngredients} from "./ingredients-slice";

describe("ingredientsSlice", () => {
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
        const result = ingredientsReducer(undefined, { type: "" })

        expect(result).toEqual({ ingredients: [] });
    });

    it('should set ingredients with "setIngredients" action', function () {
        const action = {type: setIngredients.type, payload: [mockIngredient]}
        const result = ingredientsReducer({ ingredients: [] }, action)

        expect(result.ingredients?.[0]?.name).toBe("Test");
        expect(result.ingredients?.[0]?.price).toBe(5);
    });
})