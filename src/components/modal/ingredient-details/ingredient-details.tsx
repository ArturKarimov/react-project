import React from "react";
import ing from "./ingredient-details.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useLocation, useParams} from "react-router-dom";
import {deleteIngredientInfo, getIngredientInfo} from "../../../services/ingredient/ingredient-slice";
import {ILocationState} from "../../../common/interface";

enum Characteristics {
    Calories = "Калории, ккал",
    Proteins = "Белки, г",
    Fats = "Жиры, г",
    Carbohydrates = "Углеводы, г"
}

const IngredientDetails = () => {
    const { ingredient } = useAppSelector(state => state.ingredientReducer)
    const {ingredients} = useAppSelector(state => state.ingredientsReducer)

    const params = useParams<{id?: string}>();
    let location = useLocation() as ILocationState;

    const dispatch = useAppDispatch()

    const oneIngredient = React.useMemo(() => {
        return ingredients?.find(el => el._id === params.id)
    }, [ingredients, params.id])

    React.useEffect(() => {
        if (location.state?.background) {
            location.state.background = null;
        }
    }, [location.state])

    React.useEffect(() => {
            if (oneIngredient) {
                dispatch(getIngredientInfo(oneIngredient))
            }
    }, [oneIngredient])

    React.useEffect((): () => void => {
        return () => dispatch(deleteIngredientInfo())
    }, [])

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