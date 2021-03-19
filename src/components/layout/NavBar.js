import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import AppIcon from '../../images/blog.png';
import MyButton from '../../util/MyButton';
import { logoutUser } from '../../redux/actions/user';
import PostBlog from '../blog/PostBlog';
import Notifications from './Notifications';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// MUI Icons
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = (theme) => ({
	...theme.myCSS,
	toolbar: {
		display: 'flex',
		'& div': {
			flex: 1,
			display: 'flex',
			justifyContent: 'center',
		},
		'& div:first-of-type': {
			justifyContent: 'flex-start',
		},
	},
});

const NavBar = ({ classes, authenticated, logoutUser }) => {
	const navMarkup = authenticated ? (
		<Fragment>
			<Route exact path='/' component={PostBlog} />
			<Link to='/'>
				<MyButton tip='Home'>
					<HomeIcon />
				</MyButton>
			</Link>
			<Notifications />
			<MyButton tip='Logout' onClick={logoutUser}>
				<ExitToAppIcon />
			</MyButton>
		</Fragment>
	) : (
		<Fragment>
			<Button component={Link} to='/' color='inherit'>
				Home
			</Button>
			<Button component={Link} to='/login' color='inherit'>
				Login
			</Button>
			<Button component={Link} to='/signup' color='inherit'>
				Signup
			</Button>
		</Fragment>
	);

	return (
		<AppBar>
			<Toolbar className={classes.toolbar}>
				<div>
					<Button component={Link} to='/'>
  					<img src={AppIcon} alt='App Icon' className={classes.appIcon} />
  				</Button>
				</div>
				<div>
					{navMarkup}
				</div>
			</Toolbar>
		</AppBar>
	);
};
NavBar.propTypes = {
	classes: PropTypes.object.isRequired,
	authenticated: PropTypes.bool.isRequired,
	logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(
	mapStateToProps,
	{ logoutUser }
)(withStyles(styles)(NavBar));