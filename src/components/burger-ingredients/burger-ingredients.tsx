import React from 'react';
import burgerIng from "./burger-ingredients.module.scss";
import IngredientsBlock from "./ingredients-block.tsx/ingredients-block";
import {Modal} from "../modal/modal";
import IngredientDetails from "../modal/ingredient-details/ingredient-details";
import {IIngredient} from "../../common/interface";
import {ingredientsApi} from "../../services/ingredients/ingredients-service";
import {useAppDispatch} from "../../hooks/redux";
import {BUN, MAIN, SAUCE} from "../../utils/constants";
import Tabs from "./tabs";
import {deleteIngredientInfo, getIngredientInfo} from "../../services/ingredient/ingredient-slice";

const BurgerIngredients = () => {
    const [currentTab, setCurrentTab] = React.useState("bun");
    const [modalActive, setModalActive] = React.useState(false);
    const dispatch = useAppDispatch();

    const {data} = ingredientsApi.useFetchAllIngredientsQuery("");

    const refTab = React.useRef<HTMLDivElement | any>(null)
    const refBuns = React.useRef<HTMLDivElement | any>(null)
    const refSauces = React.useRef<HTMLDivElement | any>(null)
    const refMains = React.useRef<HTMLDivElement | any>(null)
    const scrollRef = React.useRef<HTMLDivElement | any>(null)

    const buns = React.useMemo(() => {
        return data?.data.filter(el => el.type === BUN) || []
    }, [data?.data]);
    const sauces = React.useMemo(() => {
        return data?.data.filter(el => el.type === SAUCE) || []
    }, [data?.data]);
    const main = React.useMemo(() => {
        return data?.data.filter(el => el.type === MAIN) || []
    }, [data?.data]);

    const handleModalOpen = (content: IIngredient) => {
        setModalActive(true)
        dispatch(getIngredientInfo(content))
    }

    const handleModalClose = () => {
        dispatch(deleteIngredientInfo())
    }

    const onScroll = () => {
        const heightTab: number = refTab?.current.getBoundingClientRect().y;
        let coords: { coordY: number, tab: string }[] = [
            {coordY: Math.abs(refBuns.current.getBoundingClientRect().y - heightTab), tab: BUN},
            {coordY: Math.abs(refSauces.current.getBoundingClientRect().y - heightTab), tab: SAUCE},
            {coordY: Math.abs(refMains.current.getBoundingClientRect().y - heightTab), tab: MAIN},
        ]
        coords.sort((a, b) => a.coordY - b.coordY);
        if (currentTab !== coords[0].tab) {
            setCurrentTab(coords[0].tab)
        }
    }

    return (
        <section className={burgerIng.wrapper} >
            <div className={burgerIng.tabs} ref={refTab}>
                <Tabs active={currentTab} setActive={setCurrentTab}/>
            </div>
            <div className={burgerIng.ingredientsBlockWrapper} onScroll={onScroll} ref={scrollRef}>
                <IngredientsBlock name="Булки" ingredients={buns} handleModalOpen={handleModalOpen}
                                  refItem={refBuns}/>
                <IngredientsBlock name="Соусы" ingredients={sauces} handleModalOpen={handleModalOpen}
                                  refItem={refSauces}/>
                <IngredientsBlock name="Начинки" ingredients={main} handleModalOpen={handleModalOpen}
                                  refItem={refMains}/>
            </div>
            <Modal title="Детали ингредиента" active={modalActive} setActive={setModalActive}
                   deleteInfo={handleModalClose} width={720}>
                <IngredientDetails/>
            </Modal>
        </section>
    );
};

export default BurgerIngredients;