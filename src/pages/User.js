import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Blogs from '../components/blog/Blogs';
import Profile from '../components/profile/Profile';
import StaticProfile from '../components/profile/StaticProfile';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	blogsContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
});

const User = ({ match, authenticatedUser }) => {
	useEffect(() => {
		window.document.title = 'Blog - User';
	}, []);

	const classes = useStyles();
	const { userId, blogId } = match.params;

	return (
		<Grid container>
			<Grid item sm={8} xs={12} className={classes.blogsContainer}>
				<Blogs userId={userId} blogId={blogId} />
			</Grid>	
			<Grid item sm={4} xs={12}>
				{authenticatedUser === userId ? (
					<Profile />
				) : (
					<StaticProfile userId={userId} />
				)}
			</Grid>
		</Grid>
	);
};
User.propTypes = {
	match: PropTypes.object.isRequired,
	authenticatedUser: PropTypes.string,
};

const mapStateToProps = (state) => ({
	authenticatedUser: state.user.credentials.username,
});

export default connect(mapStateToProps)(User);