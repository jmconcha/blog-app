import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/user';
import AppIcon from '../images/blog.png';
// MUI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
	...theme.myCSS,
	paper: {
		marginBottom: 20,
		padding: 20,
	}
});

const Signup = ({
	classes,
	signupUser,
	loading,
	errors,
	history,
}) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ username, setUsername ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newUserData = {
			email,
			password,
			confirmPassword,
			username,
		};
		signupUser(newUserData, history);
	};

	return (
		<Grid container>
			<Grid item sm></Grid>
			<Grid item sm className={classes.formContainer}>
				<Paper className={classes.paper}>
					<img src={AppIcon} alt='App Icon' className={classes.appIcon}/>
					<Typography variant='h1' color='primary' className={classes.headerText}>
						Signup
					</Typography>
					<form noValidate onSubmit={handleSubmit}>
						<TextField
							name='email'
							type='email'
							label='Email Address'
							value={email}
							error={Boolean(errors?.email)}
							helperText={errors?.email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
							className={classes.textField}
						/>
						<TextField
							name='password'
							type='password'
							label='Password'
							value={password}
							error={Boolean(errors.password)}
							helperText={errors.password}
							onChange={(e) => setPassword(e.target.value)}
							fullWidth
							className={classes.textField}
						/>
						<TextField
							name='confirmPassword'
							type='password'
							label='Confirm Password'
							value={confirmPassword}
							error={Boolean(errors.confirmPassword)}
							helperText={errors.confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							fullWidth
							className={classes.textField}
						/>
						<TextField
							name='username'
							type='text'
							label='username'
							value={username}
							error={Boolean(errors.username)}
							helperText={errors.username}
							onChange={(e) => setUsername(e.target.value)}
							fullWidth
							className={classes.textField}
						/>
						<Button 
							type='submit' 
							variant='contained' 
							color='primary'
							disabled={loading}
							className={classes.button}
						>
							Login
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
					</form>
					<small className={classes.small}>
						Already have an account? Click <Link to='/login'>here</Link> to login
					</small>
				</Paper>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};
Signup.propTypes = {
	history: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	signupUser: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.ui.loading,
	errors: state.ui.errors,
});

export default connect(
	mapStateToProps,
	{ signupUser }
)(withStyles(styles)(Signup));