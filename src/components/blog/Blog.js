import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BlogDialog from './BlogDialog';
import MyButton from '../../util/MyButton';
import { deleteBlog } from '../../redux/actions/data';
import Like from './Like';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import MessageIcon from '@material-ui/icons/Message';
// MUI Icons
import DeleteIcon from '@material-ui/icons/Delete';

const styles = (theme) => ({
  ...theme.myCSS,
  root: {
    position: 'relative',
    maxWidth: 700,
    width: '80%',
    marginBottom: 20,
    padding: '6px 10px',
  },
  cardActions: {
    position: 'relative',
    padding: 0,
    margin: 0,
  },
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

const Blog = ({
  classes,
  deleteBlog,
  authenticatedUser,
  blog,
}) => {
	dayjs.extend(relativeTime);
  const {
    blogId,
    createdAt,
    imageUrl,
    username,
    likeCount,
    commentCount,
    body,
  } = blog;

  const handleDeleteClick = () => {
    deleteBlog(blogId);
  };

  const commentCountMarkup = commentCount === 0 ? (
    null
  ) : (
    <span className={classes.span}>
      {`${commentCount} ${
        commentCount > 1 ? 'comments' : 'comment'
      }`}
    </span>
  );

	return (
		<Card className={classes.root}>
			 <CardHeader
        avatar={
          <Avatar aria-label="Profile Picture" className={classes.avatar}>
            <img src={imageUrl} alt='Profile' className={classes.profileImage} />
          </Avatar>
        }
        title={
        	<Fragment>
            <MuiLink
              component={Link}
              to={`/users/${username}`}
              variant='h6'
              className={classes.appIconColor}
            >
              {username}
            </MuiLink>
            {authenticatedUser === username ? (
              <MyButton
                tip="Delete Blog"
                buttonClassName={classes.deleteButton}
                onClick={handleDeleteClick}
              >
                <DeleteIcon
                  color="inherit"
                  className={classes.deleteIcon}
                  fontSize="small"
                 />
              </MyButton>
            ) : (null)}
          </Fragment>
        }
        subheader={dayjs(createdAt).fromNow()}
      />
      <CardContent>
      	<Typography component="p">
      		{
      			body.length > 150 ?
      				(`${body.substr(0, 150)}...`) :
      				(body)
      		}
      	</Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <Like blogId={blogId} />
        <IconButton aria-label="comments">
          <MessageIcon color='primary' />
        </IconButton>
        {commentCountMarkup}
         <BlogDialog blog={blog}/>
      </CardActions>
		</Card>
	);
};
Blog.propTypes = {
  classes: PropTypes.object.isRequired,
	blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  authenticatedUser: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.user.credentials.username,
});

export default connect(
  mapStateToProps,
  { deleteBlog }
)(withStyles(styles)(Blog));