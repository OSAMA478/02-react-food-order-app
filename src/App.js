import { useState } from "react";
import Cart from "./Component/Cart/Cart";
import Header from "./Component/Layout/Header";
import { Meals } from "./Component/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
	const [isModal, setModal] = useState(false);

	const showModalHandler = () => {
		setModal(true);
	};
	const hideModalHandler = () => {
		setModal(false);
	};
	return (
		<CartProvider>
			{isModal && <Cart onClick={hideModalHandler} />}
			<Header onClick={showModalHandler} />
			<Meals />
		</CartProvider>
	);
}

export default App;
