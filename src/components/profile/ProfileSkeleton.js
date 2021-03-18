import React, { Fragment } from 'react';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
// MUI Icons
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import WebIcon from '@material-ui/icons/Web';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';


const useStyles = makeStyles({
  imageContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 8,
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.7)',
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
  editButtonContainer: {
    display: 'flex',
    width: '90%',
    justifyContent: 'flex-end',
  },
  imageUploadPlaceholder: {
    position: 'absolute',
    top: '94%',
    left: '64%',
  },
});

const ProfileSkeleton = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.imageContainer}>
        <Skeleton variant="circle" width={150} height={150} />
        <Skeleton
          variant="circle"
          width={20}
          height={20}
          className={classes.imageUploadPlaceholder}
        />
      </div>
      <div className={classes.profileDetails}>
        <Skeleton width={60} height={24} />
        <hr />
        <Skeleton width="80%" height={18} />
        <Skeleton width="60%" height={18} />
        <hr />
        <hr />
        <div>
          <WebIcon />
          <span>https://website.com</span>
        </div>
        <hr />
        <div>
          <PersonPinCircleIcon />
          <span>location</span>
        </div>
        <hr />
        <div>
          <CalendarTodayIcon />
          <span>Joined date</span>
        </div>
        <hr />
        <div className={classes.editButtonContainer}>
          <Skeleton
          variant="circle"
          width={28}
          height={28}
          className={classes.editDetailsPlaceholder}
        />
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileSkeleton;