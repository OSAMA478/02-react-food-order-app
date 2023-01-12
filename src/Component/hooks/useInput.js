import { useState } from "react";

const useInput = (validityCheck) => {
	const [enteredValue, setEnteredValue] = useState("");
	const [isTouched, setIsTouched] = useState(false);

	const enteredValueIsValid = validityCheck(enteredValue);
	const inputValueIsInvalid = !enteredValueIsValid && isTouched;

	const onChangeHandler = (event) => setEnteredValue(event.target.value);
	const onBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue("");
		setIsTouched(false);
	};
	return {
		enteredValue,
		enteredValueIsValid,
		inputValueIsInvalid,

		onChangeHandler,
		onBlurHandler,
		reset,
	};
};

export default useInput;
