import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
const queryString = require('query-string');

function App() {
	const login_url = 'https://lp2ilg294l.execute-api.ca-central-1.amazonaws.com/prod/login';

	const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

	useEffect(() => {
		const s = queryString.parse(window.location.search);

		if (s.access_token) {
			window.history.replaceState({}, "Spotify Auth Lambda", "/"); // Change URL.
			setIsSignedIn(true);
		}		
	}, []);

	return (
		<div className="App">
			<header className="App-header">
			<h3>A Spotify Authentication Lambda using Serverless</h3>
				<img src={logo} className="App-logo" alt="logo" />
				{
					isSignedIn ? 
					<p>Welcome back! You are now signed in.</p>
					:
					<a className="App-link" href={login_url}>
						Sign In
					</a>
				}
			</header>
		</div>
	);
}

export default App;
