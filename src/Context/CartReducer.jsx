export const initialState = {
    cartItems: [],
}

export function CartReducer(state, action) {
    switch (action.type) {
        case "ADD_TO_CART": {
            const item = action.payload;


            // check if i have the same item in my cart already ?? 
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem.id === item.id
            )

            // if its already there go and find it in the list and increment it by one
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((cartItem) =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity + 1 }
                            : cartItem
                    ),
                };
            }

            // if the item was not there, update the state by appending that item on to the state
            return {
                ...state,
                cartItems: [...state.cartItems, { ...item}]
            }
        }

        case "INCREMENT": {
            const id = action.payload;

            return {
                ...state,
                cartItems: state.cartItems
                    .map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
            }
        }

        case "DECREMENT": {
            const id = action.payload;

            return {
                ...state,
                cartItems: state.cartItems
                    .map((item) =>
                        item.id === id ? { ...item, quantity: item.quantity - 1 } : item)
                    .filter((item) => item.quantity > 0)
            }
        }


        case "REMOVE_FROM_CART": {
            const id = action.payload;

            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.id !== id)
            }
        }

        default:
                return state
    }
}