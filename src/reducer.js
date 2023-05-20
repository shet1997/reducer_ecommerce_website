import { INCREASE, DECREASE, REMOVE, LOADING, DISPLAY_ITEMS, CLEAR } from "./actions"

const reducer = (state, action) => {
    if (action.type === LOADING) {
        return { ...state, loading: true }
    }

    if (action.type === DISPLAY_ITEMS) {
        let data = new Map(action.payload.data.map((item) => [item.id, item]));
        return { ...state, loading: false, cart: data }
    }

    if (action.type === INCREASE) {
        let data = new Map(state.cart);
        console.log(data);
        let id = action.payload.id;
        let item = data.get(id);
        let newItem = { ...item, amount: item.amount + 1 }
        data.set(id, newItem);
        return { ...state, cart: data }
    }

    if (action.type === DECREASE) {
        let data = new Map(state.cart);
        let id = action.payload.id;
        let item = data.get(id);

        if (item.amount === 1) {
            data.delete(id);
            return { ...state, cart: data }
        }

        let newItem = { ...item, amount: item.amount - 1 }
        data.set(id, newItem)
        return { ...state, cart: data }
    }

    if (action.type === REMOVE) {
        let data = new Map(state.cart);
        let id = action.payload.id;
        data.delete(id);
        return { ...state, cart: data }
    }

    if (action.type === CLEAR) {
        return { ...state, cart: new Map() }
    }

    throw new Error(`no matching action type : ${action.type}`);

};

export default reducer;