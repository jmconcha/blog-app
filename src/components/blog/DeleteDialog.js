import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteBlog } from '../../redux/actions/data';
import MyButton from '../../util/MyButton';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// MUI Icons
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
  deleteButton: {
    position: 'absolute',
    top: '9%',
    left: '91%',
  },
  deleteIcon: {
    '&:hover': {
      color: '#ff3d00',
    },
  },
});

const DeleteDialog = ({ blogId, deleteBlog }) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = () => {
    handleClose();
    deleteBlog(blogId);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Blog"
        buttonClassName={classes.deleteButton}
        onClick={handleOpen}
      >
        <DeleteIcon
          color="inherit"
          className={classes.deleteIcon}
          fontSize="small"
         />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Blog</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can not undo once deleted. Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteClick} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
DeleteDialog.propTypes = {
  blogId: PropTypes.string.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default connect(null, {deleteBlog})(DeleteDialog);