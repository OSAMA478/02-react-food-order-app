import React from "react";
import Modal from "../UI/Modal";
import CartItem from "../Cart/CartItem";
import classes from "./Cart.module.css";

import { useContext } from "react";
import CartContext from "../../store/cart-context";
const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {
		cartCtx.removeItem(id);
	};
	const cartItemAddHandler = (id) => {
		const itemToIncrease = cartCtx.items.find((item) => item.id === id);
		cartCtx.addItem(itemToIncrease);
	};

	const cartItem = cartCtx.items.map((item) => (
		<CartItem
			key={item.id}
			name={item.name}
			price={item.price}
			amount={item.amount}
			id={item.id}
			onRemove={cartItemRemoveHandler.bind(null, item.id)}
			onAdd={cartItemAddHandler.bind(null, item.id)}
		/>
	));

	return (
		<Modal onClick={props.onClick}>
			{cartItem}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClick}>
					close
				</button>
				{hasItems && <button className={classes.button}>order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
