import { IUserInfo } from "../../common/interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface UserState {
    isAuth: boolean;
    prevPath?: string;
    isEdit?: boolean;
    user?: IUserInfo;
}

const initialState: UserState = {
    isAuth: false,
    user: undefined,
    prevPath: undefined,
    isEdit: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state: UserState, action: PayloadAction<IUserInfo | undefined>) => {
            state.user = action.payload;
        },
        setIsAuth: (state: UserState, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload;
        },
        setPrevPath: (state: UserState, action: PayloadAction<string>) => {
            state.prevPath = action.payload;
        },
        setIsEditUser: (state: UserState, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload
        }
    }
})

export const {setUserInfo, setIsAuth, setPrevPath, setIsEditUser} = userSlice.actions;
export default userSlice.reducer;