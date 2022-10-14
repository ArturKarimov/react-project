import React from "react";
import { IIngredientsData } from "../common/interface";

export const DataContext = React.createContext<IIngredientsData | null>(null);