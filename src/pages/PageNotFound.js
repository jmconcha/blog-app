import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// MUI Icons
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

const useStyles = makeStyles({
	paper: {
		margin: 'auto 40px',
		padding: 20,
		textAlign: 'center',
	},
	button: {
		margin: '40px auto 20px',
		color: '#4267B2',
    border: '2px solid #4267B2',
    padding: '2px 36px',
    borderRadius: '30px',
    letterSpacing: '1px',
    '&:hover': {
    	color: '#FFFFFF',
    	backgroundColor: '#4276b2',
    },
	},
	error: {
		color: '#4267B2',
	},
	sadIconContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	sadIcon: {
		color: '#4267B2',
		fontSize: 200,
	},
});

const PageNotFound = () => {
	useEffect(() => {
		window.document.title = 'Blog - Page Not Found';
	}, []);

	const classes = useStyles();

	return (
		<Grid container>
			<Grid item sm></Grid>
			<Grid item sm={6} xs={12}>	
				<Paper className={classes.paper}>
					<Grid container>
						<Grid item sm xs={12} className={classes.sadIconContainer}>
							<SentimentVeryDissatisfiedIcon className={classes.sadIcon} />
						</Grid>
						<Grid item sm xs={12}>
							<Typography variant="h1">
								404
							</Typography>
							<Typography variant="h3" className={classes.error}>
								ERROR
							</Typography>
							<Typography variant="h5" color="primary">
								Page Not Found
							</Typography>
							<Button 
								component={Link} 
								to='/' 
								variant="outlined" 
								className={classes.button}
							>
								Home
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};

export default PageNotFound;