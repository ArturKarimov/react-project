import React from 'react';
import burgerIng from "./burger-ingredients.module.scss";
import IngredientsBlock from "./ingredients-block.tsx/ingredients-block";
import {IIngredient} from "../../common/interface";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {BUN, MAIN, SAUCE} from "../../utils/constants";
import Tabs from "./tabs";
import {getIngredientInfo} from "../../services/ingredient/ingredient-slice";

const BurgerIngredients = () => {
    const {ingredients} = useAppSelector(state => state.ingredientsReducer)

    const [currentTab, setCurrentTab] = React.useState("bun");
    const dispatch = useAppDispatch();

    const refTab = React.useRef<HTMLDivElement | any>(null)
    const refBuns = React.useRef<HTMLDivElement | any>(null)
    const refSauces = React.useRef<HTMLDivElement | any>(null)
    const refMains = React.useRef<HTMLDivElement | any>(null)
    const scrollRef = React.useRef<HTMLDivElement | any>(null)

    const buns = React.useMemo(() => {
        return ingredients?.filter(el => el.type === BUN) || []
    }, [ingredients]);
    const sauces = React.useMemo(() => {
        return ingredients?.filter(el => el.type === SAUCE) || []
    }, [ingredients]);
    const main = React.useMemo(() => {
        return ingredients?.filter(el => el.type === MAIN) || []
    }, [ingredients]);

    const handleModalOpen = (content: IIngredient) => {
        dispatch(getIngredientInfo(content))
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
        </section>
    );
};

export default BurgerIngredients;