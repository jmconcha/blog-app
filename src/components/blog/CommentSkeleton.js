// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    width: '100%',
    marginBottom: 20,
    padding: '6px 10px',
  },
});

const CommentSkeleton = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circle" width={50} height={50} />
        }
        title={
          <Skeleton animation="wave" width="40%" height={16} />
        }
        subheader={
          <Skeleton animation="wave" width="20%" height={16} />
        }
      />
      <CardContent>
        <Skeleton animation="wave" width="95%" height={16} />
        <Skeleton animation="wave" width="100%" height={16} />
        <Skeleton animation="wave" width="80%" height={16} />
      </CardContent>
    </Card>
  );
};

export default CommentSkeleton;