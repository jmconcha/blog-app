import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postBlog } from '../../redux/actions/data';
import { clearErrors } from '../../redux/actions/ui';
import MyButton from '../../util/MyButton';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
// MUI Icons
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme) => ({
	...theme.myCSS,
	dialogTitle: {
		position: 'relative',
		color: '#4267B2',
	},
  submitButton: {
  	marginBottom: 6,
  	float: 'right',
  },
  closeButton: {
    position: 'absolute',
    top: '15%',
    left: '90%',
  },
  closeIcon: {
    '&:hover': {
      color: '#ff3d00',
    },
  },
});

const PostBlog = ({
	classes,
	postBlog,
	clearErrors,
	loading,
	errors,
	username,
	imageUrl
}) => {
	const [open, setOpen] = useState(false);
	const [body, setBody] = useState('');

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		if (body !== '') {
			setBody('');
		}
		if (errors.body) {
			clearErrors();
		}
	};

	const handleChange = (e) => {
		setBody(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		postBlog(body, username, imageUrl, handleClose);
	};

	return (
		<Fragment>
			<MyButton
				tip='Post Blog'
				onClick={handleOpen}
			>
				<AddIcon />
			</MyButton>
		  <Dialog
	    	open={open}
	    	onClose={handleClose}
	    	aria-labelledby="form-dialog-title"
	    	maxWidth='sm'
	    	fullWidth
	    >
	      <DialogTitle
	      	id="form-dialog-title"
	      	className={classes.dialogTitle}
	      >
	      	Post a new blog
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
	      </DialogTitle>
	      <DialogContent>
	        <form onSubmit={handleSubmit}>
	        	<TextField
		          name="body"
		          type="text"
		          multiline
		          rows="3"
		          error={Boolean(errors.body)}
		          helperText={errors.body}
		          placeholder="Tell what you want"
		          value={body}
		          onChange={handleChange}
		          fullWidth
		          className={classes.textField}
		        />
		        <Button
		        	type="submit"
		        	variant="contained"
		        	color="primary"
		        	disabled={loading}
		        	className={classes.submitButton}
		        >
		        	Post
		        	{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
		        </Button>
	        </form>
	      </DialogContent>
	    </Dialog>
		</Fragment>
	);
};
PostBlog.propTypes = {
	classes: PropTypes.object.isRequired,
	postBlog: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	errors: PropTypes.object.isRequired,
	imageUrl: PropTypes.string,
	username: PropTypes.string,
};

const mapStateToProps = (state) => ({
	loading: state.ui.loading,
	errors: state.ui.errors,
	username: state.user.credentials.username,
	imageUrl: state.user.credentials.imageUrl,	
});

export default connect(
	mapStateToProps,
	{ clearErrors, postBlog }
)(withStyles(styles)(PostBlog));