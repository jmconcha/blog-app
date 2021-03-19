import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import ProfileSkeleton from './ProfileSkeleton';
import { db } from '../../util/firebase';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
// MUI Icons
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import WebIcon from '@material-ui/icons/Web';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const styles = (theme) => ({
	...theme.myCSS,
	avatar: {
		width: 150,
		height: 150,
		marginBottom: 6,
	},
	paper: {
		position: 'sticky',
		top: 100,
		padding: 20,
		marginLeft: 20,
		marginRight: 20,
	},
	imageContainer: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	profileDetails: {
		textAlign: 'center',
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0',
		},
		'& a': {
			color: '#4267B2',
		},
		'& svg': {
			marginRight: 6,
			verticalAlign: 'middle',
		},
	},
});

const Profile = ({ classes, userId }) => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		db
			.doc(`/users/${userId}`)
			.get()
			.then((userSnapshot) => {
				setUserData({
					username: userId,
					...userSnapshot.data(),
				});
			})
			.catch((err) => {
				console.error(err);
			})
	}, []);

	const profileMarkup = userData ? (
		<Fragment>
			<div className={classes.imageContainer}>
				<Avatar aria-label="Profile Picture" className={classes.avatar}>
	        <img src={userData.imageUrl} alt='Profile' className={classes.profileImage} />
	      </Avatar>
			</div>
      <div className={classes.profileDetails}>
      	<Typography
      		variant='h5'
      		className={classes.appIconColor}
      	>
	      	{userData.username}
	      </Typography>
	      <hr />
      	{userData.bio && (
	      	<Fragment>
	      		<Typography variant='body1' color='inherit'>
			      	{userData.bio}
			      </Typography>
	      		<hr />
	      	</Fragment>
	      )}
	      {userData.website && (
	      	<Fragment>
		      	<WebIcon color='primary' />
		      	<a href={userData.website} target='_blank' rel='noopener noreferrer'>
		      		{userData.website}
		      	</a>
	      		<hr />
	      	</Fragment>
	      )}
	      {userData.location && (
	      	<Fragment>
		      	<PersonPinCircleIcon color='primary' />
		      	<span>{userData.location}</span>
	      		<hr />
	      	</Fragment>
	      )}
	      <CalendarTodayIcon color='primary' />
	      <span>Joined {dayjs(userData.createdAt).format('MMM DD YYYY')}</span>
      </div>
		</Fragment>
	) : (
		<ProfileSkeleton isStatic={true} />
	);

	return (
		<Paper className={classes.paper}>
			{profileMarkup}
		</Paper>
	);
};
Profile.propTypes = {
	classes: PropTypes.object.isRequired,
	userId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Profile);