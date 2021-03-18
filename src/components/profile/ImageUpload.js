import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/user';
// MUI Icons
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
	editButton: {
		position: 'absolute',
		top: '80%',
		left: '60%',
		transform: 'scale(0.8)',
	}
});

const ImageUpload = ({ uploadImage, username }) => {
	const classes = useStyles();
	const input = useRef();

	const handleClick = () => {
		input.current.click();
	};

	const handleChange = (event) => {
		uploadImage(event.target.files[0], username);
	};

	return (
		<Fragment>
			<input
				hidden
				type='file' 
				onChange={handleChange}
				ref={input}
			/>
			<MyButton
				tip='Change Profile Picture'
				onClick={handleClick}
				buttonClassName={classes.editButton}
			>
				<EditIcon color='primary' />
			</MyButton>
		</Fragment>
	);
};
ImageUpload.propTypes = {
	uploadImage: PropTypes.func.isRequired,
	username: PropTypes.string,
};

const mapStateToProps = (state) => ({
	username: state.user.credentials.username,
});

export default connect(
	mapStateToProps,
	{ uploadImage }
)(ImageUpload);