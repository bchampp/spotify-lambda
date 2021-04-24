import logo from './logo.svg';
import './App.css';

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>A Spotify Authentication Lambda using Serverless</p>
				<a className="App-link" target="_blank">
					Sign In
				</a>
			</header>
		</div>
	);
}

export default App;
