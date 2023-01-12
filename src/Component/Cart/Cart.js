import React, { useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "../Cart/CartItem";
import classes from "./Cart.module.css";

import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
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

	const orderHandler = () => {
		setIsCheckout(true);
	};
	const backHandler = () => {
		setIsCheckout(false);
	};

	const confirmHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			"https://food-order-app-abe65-default-rtdb.firebaseio.com/order-details.json",
			{
				method: "POST",
				body: JSON.stringify({
					userData: { ...userData, totalAmount: totalAmount },
					orderedItem: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
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

	const carModalContent = (
		<React.Fragment>
			{!isCheckout && cartItem}
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				{!isCheckout && (
					<button className={classes["button--alt"]} onClick={props.onClick}>
						close
					</button>
				)}
				{!isCheckout && hasItems && (
					<button className={classes.button} onClick={orderHandler}>
						order
					</button>
				)}
			</div>
			{isCheckout && (
				<Checkout
					onBack={backHandler}
					isCheckout={isCheckout}
					onConfirm={confirmHandler}
					onCancel={props.onClick}
				/>
			)}
		</React.Fragment>
	);

	const isSubmittingModalContent = <p>sending order data...</p>;

	const didSubmitModalContent = (
		<>
			<p>your order is sent.</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onClick}>
					close
				</button>
			</div>
		</>
	);

	return (
		<Modal onClick={props.onClick}>
			{!isSubmitting && !didSubmit && carModalContent}
			{isSubmitting && isSubmittingModalContent}
			{!isSubmitting && didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
