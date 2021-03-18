// MUI Components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    width: '80%',
    marginBottom: 20,
    padding: '6px 10px',
  },
  cardActions: {
    position: 'relative',
  },
  unfoldMoreIconPlaceholder: {
    position: 'absolute',
    left: '55%',
  },
});

const BlogSkeleton = () => {
  const classes = useStyles();
  const placeholders = Array.from({ length: 3 }).map((val, index) => (
    <Card key={index} className={classes.root}>
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
      <CardActions>
        <Skeleton animation="wave" variant="circle" width={20} height={20} />
        <Skeleton animation="wave" variant="circle" width={20} height={20} />
        <Skeleton
          animation="wave"
          variant="circle"
          width={20}
          height={20}
          className={classes.unfoldMoreIconPlaceholder}
        />
      </CardActions>
    </Card>
  ));

  return (
    placeholders
  );
};

export default BlogSkeleton;