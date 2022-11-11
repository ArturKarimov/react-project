import bunIcon from "../images/burger.png";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const BUN = "bun";
export const SAUCE = "sauce";
export const MAIN = "main";

export const TOP = " (верх)";
export const BOTTOM = " (низ)";

export const defaultBun = {
    text: "Булка",
    price: 0,
    image: bunIcon,
    isLocked: true
}

export const FORGOT_PATH = "/forgot-password"

export const ErrorMessages = {
    "User already exists": "Пользователь с таким e-mail уже зарегистрирован",
    "Email, password and name are required fields": "Заполните все поля и повторите попытку",
    "PARSING_ERROR": "Проверьте корректность введенных данных и повторите попытку",
    "email or password are incorrect": "Введен неверный e-mail или пароль",
    "Invalid credentials provided": "Введен некорректный код из письма"
};