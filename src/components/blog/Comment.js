import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
	...theme.myCSS,
	commentContainer: {
		paddingLeft: 10,
		paddingRight: 10,
	},
  commentHeader: {
  	marginRight: 20,
  },
  commentBody: {
  	padding: '0 6px',
  },
  date: {
  	fontSize: '0.8rem',
  },
});

const Comment = ({
	classes,
	comment: {
		username,
		imageUrl,
		createdAt,
		comment,
	},
}) => (
	<Fragment>
		<hr className={classes.visibleSeparator} />
		<Grid container className={classes.commentContainer}>
			<Grid container>
				<Grid item className={classes.commentHeader}>
					<Avatar aria-label="Profile Picture" className={classes.avatar}>
	          <img src={imageUrl} alt='Profile' className={classes.profileImage} />
	        </Avatar>
				</Grid>
				<Grid item sm>
					<MuiLink component={Link} to={`/users/${username}`} variant="h6">
		  			{username}
		  		</MuiLink>
		  		<Typography variant="body2" color="textSecondary" className={classes.date}>
		  			{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
		  		</Typography>
				</Grid>
			</Grid>
			<Grid item sm={12}>
				<hr className={classes.invisibleSeparator} />
				<Typography variant="body1" color="inherit"  className={classes.commentBody}>
					{comment}
				</Typography>
			</Grid>
		</Grid>
	</Fragment>
);
Comment.propTypes = {
	classes: PropTypes.object.isRequired,
	comment: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);