import constructorReducer,
{
    addIngredient,
    addBun,
    deleteIngredient,
    moveIngredient,
    clearConstructor
} from "./constructor-slice";

describe("constructorSlice", () => {
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

    const mockSecondIngredient = {
        _id: "345",
        name: "Test1",
        type: "Test1",
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

    const mockConstructorItem = {
        ingredient: mockIngredient,
        uniqID: "123"
    }

    it('should return default state when passed an empty action', function () {
        const result = constructorReducer(undefined, { type: "" })

        expect(result).toEqual({ ingredients: [] });
    });

    it('should add first ingredient to constructor.spec.ts with "addIngredient" action', function () {
        const action = {type: addIngredient.type, payload: mockConstructorItem}
        const result = constructorReducer({ ingredients: [] }, action)

        expect(result.ingredients?.[0].name).toBe("Test");
        expect(result.ingredients?.[0].uniqID).toBe("123");
        expect(result.ingredients?.[0].count).toBe(1);
    });

    it('should add second same ingredient to constructor.spec.ts with "addIngredient" action', function () {
        const action = {type: addIngredient.type, payload: mockConstructorItem}
        const result = constructorReducer({ ingredients: [{...mockIngredient, uniqID: "123", count: 1}] }, action)

        expect(result.ingredients?.[0].name).toBe("Test");
        expect(result.ingredients?.[0].uniqID).toBe("123");
        expect(result.ingredients?.[0].count).toBe(2);

        expect(result.ingredients?.[1].name).toBe("Test");
        expect(result.ingredients?.[1].uniqID).toBe("123");
        expect(result.ingredients?.[1].count).toBe(1);
    });

    it('should delete ingredient to constructor.spec.ts with "deleteIngredient" action', function () {
        const action = {type: deleteIngredient.type, payload: { ingredient: {...mockIngredient, uniqID: "123"} }}
        const result = constructorReducer({ ingredients: [{...mockIngredient, uniqID: "123", count: 1}] }, action)

        expect(result.ingredients).toEqual([])
    });

    it('should add bun to constructor.spec.ts with "addBun" action', function () {
        const action = {type: addBun.type, payload: mockConstructorItem}
        const result = constructorReducer({ ingredients: [], bun: undefined }, action)

        expect(result.bun?.type).toBe("Test")
    });

    it('should move ingredient into constructor.spec.ts with "moveIngredient" action', function () {
        const action = {type: moveIngredient.type, payload: {hoverIndex: 0, dragIndex: 1}}
        const result = constructorReducer({ ingredients: [mockIngredient, mockSecondIngredient] }, action)

        expect(result).toEqual({ ingredients: [mockSecondIngredient, mockIngredient] })
    });

    it('should clear constructor.spec.ts with "clearConstructor" action', function () {
        const action = {type: clearConstructor.type}
        const result = constructorReducer({ ingredients: [mockIngredient, mockSecondIngredient], bun: mockIngredient }, action)

        expect(result).toEqual({ingredients: [], bun: undefined})
    });
})