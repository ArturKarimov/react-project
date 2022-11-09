import React from "react";
import ing from "./ingredient-details.module.scss";
import {useAppSelector} from "../../../hooks/redux";
import {useHistory, useParams} from "react-router-dom";
import {ingredientsApi} from "../../../services/ingredients/ingredients-service";
import {log} from "util";
import {IIngredient} from "../../../common/interface";

enum Characteristics {
    Calories = "Калории, ккал",
    Proteins = "Белки, г",
    Fats = "Жиры, г",
    Carbohydrates = "Углеводы, г"
}

const IngredientDetails = () => {
    const { ingredient: ingredientItem } = useAppSelector(state => state.ingredientReducer)
    const {data} = ingredientsApi.useFetchAllIngredientsQuery("");

    const [ingredient, setIngredient] = React.useState<IIngredient | undefined>(undefined);
    const history = useHistory()
    const params = useParams<{id?: string}>();

    const oneIngredient = data?.data.find(el => el._id === params.id)

    React.useEffect(() => {
        setIngredient(ingredientItem)
    }, [ingredientItem])

    React.useEffect(() => {
        if (!ingredientItem && params?.id) {
            setIngredient(oneIngredient)
        }
    }, [params?.id, ingredientItem])

    React.useEffect(() => {
        window.history.pushState(null, "", `/ingredients/${ingredientItem?._id || oneIngredient?._id}`);

        return () => history.replace({pathname: "/"});
    }, [history])

    const getInfo = (name: Characteristics, quantity: number | string) => {
        return (
            <div className={ing.info}>
                <p className="text text_type_main-default">{name}</p>
                <p className="text text_type_digits-default">{quantity}</p>
            </div>
        )
    }

    return (
        <div className={ing.wrapper}>
            <div className={ing.imageWrapper}>
                <img src={ingredient?.image_large} alt={ingredient?.name}/>
            </div>
            <p className="text text_type_main-medium">{ingredient?.name}</p>
            <div className={ing.characteristics}>
                {getInfo(Characteristics.Calories, ingredient?.calories || "-")}
                {getInfo(Characteristics.Proteins, ingredient?.proteins || "-")}
                {getInfo(Characteristics.Fats, ingredient?.fat || "-")}
                {getInfo(Characteristics.Carbohydrates, ingredient?.carbohydrates || "-")}
            </div>
        </div>
    );
};

export default IngredientDetails;