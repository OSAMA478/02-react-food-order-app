import { useState } from "react";
import classes from "./Checkout.module.css";
import useInput from "../hooks/useInput";

const Checkout = (props) => {
	// const [enteredName, setEnteredName] = useState();
	// const [street, setStreet] = useState();
	// const [postalCode, setPostalCode] = useState();
	// const [city, setCity] = useState();

	const {
		enteredValue: enteredName,
		enteredValueIsValid: enteredNameValueIsValid,
		inputValueIsInvalid: enteredNameIsInvalid,
		onChangeHandler: onChangeNameHandler,
		onBlurHandler: onBlurNameHandler,
		reset: onResetName,
	} = useInput((value) => value.trim() !== "");
	const {
		enteredValue: enteredStreer,
		enteredValueIsValid: enteredStreerValueIsValid,
		inputValueIsInvalid: enteredStreerIsInvalid,
		onChangeHandler: onChangeStreerHandler,
		onBlurHandler: onBlurStreerHandler,
		reset: onResetStreer,
	} = useInput((value) => value.trim() !== "");
	const {
		enteredValue: enteredPostalCode,
		enteredValueIsValid: enteredPostalCodeValueIsValid,
		inputValueIsInvalid: enteredPostalCodeIsInvalid,
		onChangeHandler: onChangePostalCodeHandler,
		onBlurHandler: onBlurPostalCodeHandler,
		reset: onResetPostalCode,
	} = useInput((value) => value.trim().length === 6);
	const {
		enteredValue: enteredCity,
		enteredValueIsValid: enteredCityValueIsValid,
		inputValueIsInvalid: enteredCityIsInvalid,
		onChangeHandler: onChangeCityHandler,
		onBlurHandler: onBlurCityHandler,
		reset: onResetCity,
	} = useInput((value) => value.trim() !== "");

	const confirmHandler = (event) => {
		event.preventDefault();

		const obj = {
			name: enteredName,
			street: enteredStreer,
			postalCode: enteredPostalCode,
			city: enteredCity,
		};

		props.onConfirm(obj);

		onResetName("");
		onResetStreer("");
		onResetPostalCode("");
		onResetCity("");
	};
	let formIsValid = false;

	if (
		enteredNameValueIsValid &&
		enteredStreerValueIsValid &&
		enteredPostalCodeValueIsValid &&
		enteredCityValueIsValid
	) {
		formIsValid = true;
	}

	return (
		<form className={classes.form} onSubmit={confirmHandler}>
			<div className={enteredNameIsInvalid ? classes.invalid : classes.control}>
				<div>
					<label htmlFor="name">Your Name</label>
					{enteredNameIsInvalid && (
						<p className={classes.invalid_para}> enter non-empty name</p>
					)}
				</div>
				<input
					value={enteredName}
					onChange={onChangeNameHandler}
					onBlur={onBlurNameHandler}
					type="text"
					id="name"
				/>
			</div>
			<div
				className={enteredStreerIsInvalid ? classes.invalid : classes.control}
			>
				<div>
					<label htmlFor="street">Street</label>

					{enteredStreerIsInvalid && (
						<p className={classes.invalid_para}> enter non-empty street</p>
					)}
				</div>
				<input
					value={enteredStreer}
					onChange={onChangeStreerHandler}
					onBlur={onBlurStreerHandler}
					type="text"
					id="street"
				/>
			</div>
			<div
				className={
					enteredPostalCodeIsInvalid ? classes.invalid : classes.control
				}
			>
				<div>
					<label htmlFor="postal">Postal Code</label>
					{enteredPostalCodeIsInvalid && (
						<p className={classes.invalid_para}>
							{" "}
							enter non-empty postal code (6-digit)
						</p>
					)}
				</div>
				<input
					value={enteredPostalCode}
					onChange={onChangePostalCodeHandler}
					onBlur={onBlurPostalCodeHandler}
					type="text"
					id="postal"
				/>
			</div>
			<div className={enteredCityIsInvalid ? classes.invalid : classes.control}>
				<div>
					<label htmlFor="city">City</label>

					{enteredCityIsInvalid && (
						<p className={classes.invalid_para}> enter non-empty city</p>
					)}
				</div>
				<input
					value={enteredCity}
					onChange={onChangeCityHandler}
					onBlur={onBlurCityHandler}
					type="text"
					id="city"
				/>
			</div>
			<div className={classes.actions}>
				<button type="button" onClick={props.onBack}>
					Back
				</button>
				<button type="button" onClick={props.onCancel}>
					Cancel
				</button>
				<button
					disabled={!formIsValid}
					className={formIsValid ? classes.submit : classes.unSubmit}
					onClick={confirmHandler}
				>
					Confirm
				</button>
			</div>
		</form>
	);
};

export default Checkout;
