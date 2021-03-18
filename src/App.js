import { 
	BrowserRouter as Router, 
	Route,
	Switch,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import jwtDecode from 'jwt-decode';
import store from './redux/store';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import themeObj from './util/theme';
import AuthRoute from './util/AuthRoute';
import NavBar from './components/layout/NavBar';
import { getUserData } from './redux/actions/user';
// MUI Components
import {
	createMuiTheme, 
	ThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme(themeObj);

if (localStorage.getItem('FBIdToken')) {
	const token = localStorage.getItem('FBIdToken');
	const decodedToken = jwtDecode(token);
	const exp = decodedToken.exp * 1000;
	
	if (exp > Date.now()) {
		store.dispatch(getUserData(decodedToken.user_id));
	} else {
		localStorage.removeItem('FBIdToken');
		window.history.pushState(null, null, '/login');
	}
}

const App = () => {
  return (
  	<ThemeProvider theme={theme}>
  		<Provider store={store}>
  			<Router>
	  		<NavBar />
	  		<Switch>
	  			<Route exact path='/' component={Home} />
		  		<AuthRoute exact path='/login' component={Login} />
		  		<AuthRoute exact path='/signup' component={Signup} />
	  		</Switch>
	  		</Router>
  		</Provider>
  	</ThemeProvider>
  );
};

export default App;
