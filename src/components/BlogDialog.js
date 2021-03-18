import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
import Comment from './Comment';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// MUI Icons
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import MessageIcon from '@material-ui/icons/Message';

const styles = (theme) => ({
	...theme.myCSS,
  closeButton: {
    position: 'absolute',
    top: '5%',
    left: '91%',
  },
  closeIcon: {
    '&:hover': {
      color: '#ff3d00',
    },
  },
  blogHeader: {
  	marginRight: 20,
  },
  blogBody: {
  	padding: '0 6px',
  },
  date: {
  	fontSize: '0.8rem',
  },
  unfoldMoreIcon: {
  	position: 'absolute',
  	left: '92%',
  },
});

const BlogDialog = ({
	classes,
	blog: {
		blogId,
    createdAt,
    imageUrl,
    username,
    likeCount,
    commentCount,
    body,
	},
}) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Fragment>
			<MyButton
				tip="Post new blog"
				onClick={handleOpen}
				buttonClassName={classes.unfoldMoreIcon}
			>
		  	<UnfoldMoreIcon color='primary' />
		  </MyButton>
		  <Dialog
	    	open={open}
	    	onClose={handleClose}
	    	maxWidth='sm'
	    	fullWidth
	    >
	      <DialogContent>
	        <Grid container>
						<Grid container>
							<Grid item className={classes.blogHeader}>
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
					  		<MyButton
									tip="Close"
									buttonClassName={classes.closeButton}
									onClick={handleClose}
								>
									<ClearIcon
										color="inherit"
								    className={classes.closeIcon}
								    fontSize="small"
								   />
								</MyButton>
							</Grid>
						</Grid>
						<Grid item sm={12}>
							<hr className={classes.invisibleSeparator} />
							<Typography variant="body1" color="inherit"  className={classes.blogBody}>
								{body}
							</Typography>
							<IconButton aria-label="like">
			          <FavoriteBorderIcon color='primary' />
			        </IconButton>
			        <IconButton aria-label="comments">
			          <MessageIcon color='primary' />
			        </IconButton>
			        <hr className={classes.visibleSeparator} />
			        <Comment blogId={blogId} />
						</Grid>
			  	</Grid>
	      </DialogContent>
	    </Dialog>
		</Fragment>
	);
};
BlogDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	blog: PropTypes.object,
};

export default withStyles(styles)(BlogDialog);