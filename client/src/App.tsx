import logo from './logo.svg';
import './App.css';

function App() {
	const login_url = 'https://lp2ilg294l.execute-api.ca-central-1.amazonaws.com/prod/login'
	console.log(login_url);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>A Spotify Authentication Lambda using Serverless</p>
				<a className="App-link" href={login_url}>
					Sign In
				</a>
			</header>
		</div>
	);
}

export default App;
