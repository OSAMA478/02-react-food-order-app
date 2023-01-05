import React from "react";
import headerImage from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCardButton from "./HeaderCardButton";
const Header = (props) => {
	return (
		<>
			<header className={classes.header}>
				<h1>React Foods </h1>
				<HeaderCardButton onClick={props.onClick} />
			</header>
			<div className={classes["main-image"]}>
				<img src={headerImage} alt="a table full of dishes " />
			</div>
		</>
	);
};

export default Header;
