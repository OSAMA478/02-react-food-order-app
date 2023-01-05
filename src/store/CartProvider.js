import React from "react";
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

const cartReducer = (state, action) => {
	if (action.type === "ADD_ITEM") {
		const updatedItems = [
			...state.items.filter(({ id }) => id !== action.item.id),
			action.item,
		];
		const updatedTotalAmount = updatedItems.reduce((acc, item) => {
			return acc + item.price * item.amount;
		}, 0);
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	} else if (action.type === "REMOVE_ITEM") {
		const found = state.items.find(({ id }) => id === action.id);

		const itemToRemove = {
			...found,
			amount: found.amount - 1,
		};
		let updatedItems;
		if (itemToRemove.amount < 1) {
			updatedItems = [...state.items.filter(({ id }) => id !== action.id)];
		} else {
			updatedItems = [
				...state.items.filter(({ id }) => id !== action.id),
				itemToRemove,
			];
		}
		const updatedTotalAmount = updatedItems.reduce((acc, item) => {
			return acc + item.price * item.amount;
		}, 0);
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}
	return defaultCartState;
};

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);
	const addItemToCartHandler = (item) => {
		const found = cartState.items.find(({ id }) => id === item.id);

		if (!found) {
			dispatchCartAction({ type: "ADD_ITEM", item: item });
		} else {
			const updatedItem = {
				...found,
				amount: found.amount + 1,
			};
			dispatchCartAction({ type: "ADD_ITEM", item: updatedItem });
		}
	};
	const removeItemToCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE_ITEM", id: id });
	};

	const cartContext = {
		items: cartState.items.sort((a, b) => a.price - b.price),
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemToCartHandler,
	};
	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;
