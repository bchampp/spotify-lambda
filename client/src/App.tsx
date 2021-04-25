import logo from './logo.svg';
import './App.css';
import env from 'react-dotenv';

function App() {
	console.log(env.API_URL)
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>A Spotify Authentication Lambda using Serverless</p>
				<a className="App-link" target="_blank" href="spotify.com">
					Sign In
				</a>
			</header>
		</div>
	);
}

export default App;
