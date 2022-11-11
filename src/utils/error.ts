import {IFetchError} from "../common/interface";

export const isFetchBaseQueryErrorType = (error: any): error is IFetchError => 'status' in error