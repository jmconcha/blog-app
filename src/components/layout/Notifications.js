import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { markNotificationsRead } from '../../redux/actions/user';
// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Badge from '@material-ui/core/Badge';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';

const useStyles = makeStyles({
  menuItem: {
    padding: 0,
  },
  icon: {
    marginRight: 10,
    verticalAlign: 'middle',
  },
  link: {
    padding: '8px 14px',
    width: '100%',
    '&:hover': {
      textDecoration: 'underline',
      textDecorationColor: '#4267B2',
    },
  },
});

const Notifications = ({ notifications, markNotificationsRead }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  dayjs.extend(relativeTime);

  const countUnreadNotifications = () => {
    return notifications.reduce((accum, notif) => {
      if (!notif.read) {
        return accum + 1;
      }
      return accum;
    }, 0);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const unreadNotificationIds = [];
    notifications.forEach((notif) => {
      if (!notif.read) {
        unreadNotificationIds.push(notif.notificationId);
      }
    });
    markNotificationsRead(unreadNotificationIds);
  };

  const unreadNotifications = countUnreadNotifications();
  const notificationIcon = unreadNotifications > 0 ? (
    <Tooltip title="You have unread notifications">
      <IconButton
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
      >
        <Badge badgeContent={unreadNotifications} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title="Notifications">
      <IconButton
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick}
      >
        <NotificationsIcon />
      </IconButton>
    </Tooltip>
  );

  const menuItemsMarkup = notifications.map((notif) => {
    const verb = notif.type === 'like' ? 'liked' : 'commented on';
    const color = notif.read ? 'primary' : 'secondary';
    const icon = notif.type === 'like' ? (
      <FavoriteIcon color={color} className={classes.icon} />
    ) : (
      <MessageIcon color={color} className={classes.icon} />
    );
    const timelapse = dayjs(notif.createdAt).fromNow();

    return (
      <MenuItem key={notif.notificationId} className={classes.menuItem}>
        <MuiLink
          component={Link}
          to={`/users/${notif.recipient}/blogs/${notif.blogId}`}
          color="inherit"
          variant="body2"
          underline="none"
          onClick={handleClose}
          className={classes.link}
        >
          {icon}{`${notif.sender} ${verb} your blog (${timelapse})`}
        </MuiLink>
      </MenuItem>
    );
  });

  return (
    <Fragment>
      {notificationIcon}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItemsMarkup}
      </Menu>
    </Fragment>
  );
};
Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);