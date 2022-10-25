import React from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {BUN, MAIN, SAUCE} from "../../utils/constants";
import tabStyle from "./burger-ingredients.module.scss";

const tabs = [
    {name: "Булки", value: BUN},
    {name: "Соусы", value: SAUCE},
    {name: "Начинки", value: MAIN},
]

interface ITabs {
    active: string;
    setActive: (tab: string) => void;
}

const Tabs: React.FC<ITabs> = ({active, setActive}) => {


    return (
        <div className={tabStyle.tabs}>
            {tabs.map(tab => {
                return (
                    <Tab key={tab.value} value={tab.value} active={active === tab.value} onClick={setActive}>
                        {tab.name}
                    </Tab>
                )
            })}
        </div>
    );
};

export default Tabs;