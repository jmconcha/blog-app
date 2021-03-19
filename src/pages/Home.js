import React, { useEffect } from 'react';
import Blogs from '../components/blog/Blogs';
import Profile from '../components/profile/Profile';
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

const Home = () => {
	useEffect(() => {
		window.document.title = 'Blog - Home';
	}, []);

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item sm={8} xs={12} className={classes.blogsContainer}>
				<Blogs />
			</Grid>	
			<Grid item sm={4} xs={12}>
				<Profile />
			</Grid>
		</Grid>
	);
};

export default Home;