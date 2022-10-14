import {baseUrl, orderInfo} from "../constants";
import {IOrderInfoRequest} from "../../common/interface";

export class Requests {
    static getIngredients() {
        return fetch(baseUrl)
    }

    static getOrderDetails(selectedItems: IOrderInfoRequest) {
        return fetch(orderInfo, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(selectedItems)
        })
    }
}