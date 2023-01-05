import React, { Fragment, useContext, useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/cart-context";
const HeaderCardButton = (props) => {
	const [isBump, setIsBump] = useState(false);
	let x = 1;
	const cartCtx = useContext(CartContext);
	const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
		return curNum + item.amount;
	}, 0);
	const { items } = cartCtx;

	useEffect(() => {
		if (cartCtx.items.length === 0) return;
		setIsBump(true);

		const timer = setTimeout(() => setIsBump(false), 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	const btnClasses = `${classes.button}   ${isBump ? classes.bump : ""}`;
	return (
		<Fragment>
			<button className={btnClasses} onClick={props.onClick}>
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
