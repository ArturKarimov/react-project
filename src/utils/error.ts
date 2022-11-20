import {IFetchError} from "../common/interface";

export const isFetchBaseQueryErrorType = (error: unknown): error is IFetchError => 'status' in error!;