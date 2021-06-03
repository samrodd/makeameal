import * as React from 'react';
import { useState, useEffect } from 'react';
import ingredients from '../server/db/ingredients';

/* HOOK REACT EXAMPLE */
// const App = (props: AppProps) => {
// 	const [greeting, setGreeting] = useState<string>('');

// 	useEffect(() => {
// 		async function getGreeting() {
// 			try {
// 				const res = await fetch('/api/hello');
// 				const greeting = await res.json();
// 				setGreeting(greeting);
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		}
// 		getGreeting();
// 	}, []);

// 	return (
// 		<main className="container my-5">
// 			<h1 className="text-primary text-center">Make A Meal</h1>
// 		</main>
// 	);
// };

// interface IAppProps {

// }

// interface IAppState{
// 	ingredients: Array<{id: number, ingredient_name: string}>;
// }


/* CLASS REACT EXAMPLE */
class App extends React.Component<IAppProps, IAppState> {
	constructor(props: IAppProps) {
		super(props);
		this.state = {
			ingredients: []
		};
	}

	async componentDidMount() {
		try {
			let r = await fetch('/api/ingredients');
			let ingredients = await r.json();
			this.setState({ ingredients });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">Make A Meal</h1>
				<ul className="list-group">
					{this.state.ingredients.map(ingredients =>{
						return <li className="list-group-item">{ingredients.ingredient_name}</li>
					})}
				</ul>
			</main>
		);
	}
}

export interface IAppProps {}

export interface IAppState {
	ingredients: Array<{id: number, ingredient_name: string}>;
}

export default App;
