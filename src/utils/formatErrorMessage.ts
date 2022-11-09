import {ErrorMessages} from "./constants";

export const formatErrorMessage = (error: string) => {
    for (const err in ErrorMessages) {
        if (err === error) {
            return ErrorMessages[err as keyof typeof ErrorMessages];
        }
    }
    return "Произошла ошибка. Обратитесь к администратору";
};