import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import { getBlogs } from '../redux/actions/data';
// MUI Components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const styles = (theme) => ({
  ...theme.myCSS,
  root: {
    maxWidth: 700,
    width: '80%',
    marginBottom: 20,
    padding: '6px 10px',
  },
  cardActions: {
    padding: 0,
    margin: 0,
  },
});

const Blog = ({
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
	dayjs.extend(relativeTime);

	return (
		<Card className={classes.root}>
			 <CardHeader
        avatar={
          <Avatar aria-label="Profile Picture" className={classes.avatar}>
            <img src={imageUrl} alt='Profile Picture' className={classes.profileImage} />
          </Avatar>
        }
        title={
        	<Typography variant='h6' color='primary'>
        		{username}
        	</Typography>
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
        <IconButton aria-label="like">
          <FavoriteBorderIcon color='primary' />
        </IconButton>
        <IconButton aria-label="comments">
          <MessageIcon color='primary' />
        </IconButton>
         <IconButton>
          <UnfoldMoreIcon color='primary' />
         </IconButton>
      </CardActions>
		</Card>
	);
};
Blog.propTypes = {
  classes: PropTypes.object.isRequired,
	blog: PropTypes.object.isRequired,
};


export default withStyles(styles)(Blog);