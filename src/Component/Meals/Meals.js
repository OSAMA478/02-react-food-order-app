import React, { Fragment } from "react";
import { AvailableMeals } from "./AvailableMeals";
import MealsSummery from "./MealsSummery";

export const Meals = () => {
	return (
		<Fragment>
			<MealsSummery />
			<AvailableMeals />
		</Fragment>
	);
};
