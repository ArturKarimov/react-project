import userReducer, {setUserInfo, setIsAuth, setPrevPath, setIsEditUser, initialState} from "./user-slice";

describe("userSlice", () => {
    it('should return default state when passed an empty action', function () {
        const result = userReducer(undefined, { type: "" })

        expect(result).toEqual({
            isAuth: false,
            user: undefined,
            prevPath: undefined,
            isEdit: false
        });
    });

    it('should set user info with "setUserInfo" action', function () {
        const mockUserInfo = {
            email: "test@test.ru",
            name: "test"
        }

        const action = {type: setUserInfo.type, payload: mockUserInfo}
        const result = userReducer(initialState, action)

        expect(result.user?.email).toBe("test@test.ru");
        expect(result.user?.name).toBe("test");
    });

    it('should set isAuth label with "setIsAuth" action', function () {
        const action = {type: setIsAuth.type, payload: true}
        const result = userReducer(initialState, action)

        expect(result.isAuth).toEqual(true);
    });

    it('should save previous path with "setPrevPath" action', function () {
        const action = {type: setPrevPath.type, payload: "/prev"}
        const result = userReducer(initialState, action)

        expect(result.prevPath).toEqual("/prev");
    });

    it('should set edit mode in profile page with "setIsEditUser" action', function () {
        const action = {type: setIsEditUser.type, payload: false}
        const result = userReducer(initialState, action)

        expect(result.isEdit).toEqual(false);
    });
})