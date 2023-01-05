import React, { Fragment, useContext } from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCardButton = (props) => {
	const cartContext1 = useContext(CartContext);
	const numberOfCartItems = cartContext1.items.reduce((curNum, item) => {
		return curNum + item.amount;
	}, 0);

	return (
		<Fragment>
			<button className={classes.button} onClick={props.onClick}>
				<span className={classes.icon}>
					<CartIcon />
				</span>
				<span>Your Cart</span>
				<span className={classes.badge}>{numberOfCartItems}</span>
			</button>
		</Fragment>
	);
};

export default HeaderCardButton;
