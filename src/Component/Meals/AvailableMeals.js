import React, { Fragment, useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import { MealsItem } from "./Meal Item/MealsItem";

export const AvailableMeals = () => {
	const [loadedMeals, setLoadedMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [HttpError, setHttpError] = useState();
	// const DUMMY_MEALS = [
	// 	{
	// 		id: "m1",
	// 		name: "Sushi",
	// 		description: "Finest fish and veggies",
	// 		price: 22.99,
	// 	},
	// 	{
	// 		id: "m2",
	// 		name: "Schnitzel",
	// 		description: "A german specialty!",
	// 		price: 16.5,
	// 	},
	// 	{
	// 		id: "m3",
	// 		name: "Barbecue Burger",
	// 		description: "American, raw, meaty",
	// 		price: 12.99,
	// 	},
	// 	{
	// 		id: "m4",
	// 		name: "Green Bowl",
	// 		description: "Healthy...and green...",
	// 		price: 18.99,
	// 	},
	// ];

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const response = await fetch(
				"https://food-order-app-abe65-default-rtdb.firebaseio.com/meals.json"
			);

			if (!response.ok) {
				throw new Error("something went wrong");
			}

			const data = await response.json();

			const MEALS_LIST = [];
			for (const key in data) {
				MEALS_LIST.push({
					id: key,
					name: data[key].name,
					description: data[key].description,
					price: data[key].price,
				});
			}

			setLoadedMeals(MEALS_LIST);
			setIsLoading(false);
		};

		fetchData().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);
	const mealsList = loadedMeals.map((meal) => {
		return (
			<MealsItem
				key={meal.id}
				id={meal.id}
				name={meal.name}
				description={meal.description}
				price={meal.price}
			/>
		);
	});
	return (
		<Fragment>
			<section className={classes.meals}>
				<Card>
					{isLoading && <p>Loading...</p>}
					{HttpError && <p>{HttpError}</p>}
					<ul>{mealsList}</ul>
				</Card>
			</section>
		</Fragment>
	);
};
