// third-party libraries
import { HashRouter } from 'react-router-dom';

// components
import NavBar from './components/NavBar';
import Routes from './components/Routes';

// css
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <header className="headerContainer">
          <NavBar />
        </header>
        <main className="mainContainer">
          <Routes />
        </main>
        <footer className="footerContainer verticalPadding">
          <p>Electron app created by Kent Claudio</p>
        </footer>
      </HashRouter>
    </div>
  );
}

export default App;
