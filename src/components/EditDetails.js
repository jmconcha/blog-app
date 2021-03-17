import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/user';
import MyButton from '../util/MyButton';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
// MUI Icons
import ClearIcon from '@material-ui/icons/Clear';

const styles = (theme) => ({
	...theme.myCSS,
  clearIcon: {
    '&:hover': {
      color: '#ff3d00',
    },
  }
});

const EditDetails = ({
	classes,
	username,
	bio,
	website,
	location,
	editUserDetails,
}) => {
	const [open, setOpen] = useState(false);
	const [userDetails, setUserDetails] = useState({
		bio: '',
		website: '',
		location: '',
	});

	const handleOpen = () => {
		setUserDetails({
			bio: bio || '',
			website: website || '',
			location: location || '',
		});
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
	}

  const handleClearClick = (prop) => (e) => {
    setUserDetails({
      ...userDetails,
      [prop]: '',
    });
  };

	const handleChange = (e) => {
		setUserDetails({
			...userDetails,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = () => {
		setOpen(false);
		const newUserDetails = userDetails;
		const oldUserDetails = {
			bio,
			website,
			location,
		};
		editUserDetails(newUserDetails, oldUserDetails, username);
	};

	return (
		<Fragment>
		<MyButton tip='Edit Details' onClick={handleOpen}>
    	<EditIcon color='primary' />
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
      	className={classes.appIconColor}
      >
      	Edit Details
      </DialogTitle>
      <DialogContent>
        <TextField
          name="bio"
          type="text"
          label="Bio"
          multiline
          rows="3"
          placeholder="Tell something about yourself"
          value={userDetails.bio}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear text field"
                  onClick={handleClearClick('bio')}
                  size="small"
                >
                  <ClearIcon
                    color='inherit'
                    className={classes.clearIcon}
                    fontSize="small"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="website"
          type="text"
          label="Website"
          placeholder="Your personal/professional website"
          value={userDetails.website}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear text field"
                  onClick={handleClearClick('website')}
                  size="small"
                >
                  <ClearIcon
                    color='inherit'
                    className={classes.clearIcon}
                    fontSize="small"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="location"
          type="text"
          label="Location"
          placeholder="Tell something about yourself"
          value={userDetails.location}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear text field"
                  onClick={handleClearClick('location')}
                  size="small"
                >
                  <ClearIcon
                    color='inherit'
                    className={classes.clearIcon}
                    fontSize="small"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
    </Fragment>
	);
};
EditDetails.propTypes = {
	classes: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	bio: PropTypes.string,
	website: PropTypes.string,
	location: PropTypes.string,
	editUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	username: state.user.credentials.username,
	bio: state.user.credentials.bio,
	website: state.user.credentials.website,
	location: state.user.credentials.location,
});

export default connect(
	mapStateToProps,
	{ editUserDetails }
)(withStyles(styles)(EditDetails));
