import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ authenticated, component, ...rest }) => (
	<Route 
		{...rest}
		render={
			(props) => authenticated ? (
				<Redirect to='/' />
			) : (
				React.createElement(component, props)
			)
		}
	/>
);
AuthRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(AuthRoute);