import React, { useEffect } from 'react';
import Blogs from '../components/blog/Blogs';
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

const User = ({ match }) => {
	const classes = useStyles();
	const { userId, blogId } = match.params;

	return (
		<Grid container>
			<Grid item sm={8} xs={12} className={classes.blogsContainer}>
				<Blogs userId={userId} blogId={blogId} />
			</Grid>	
			<Grid item sm={4} xs={12}>
				<StaticProfile userId={userId} />
			</Grid>
		</Grid>
	);
};

export default User;