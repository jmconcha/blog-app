import MyButton from '../util/MyButton';
// MUI Icons
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';

const BlogDialog = () => {
	return (
		<MyButton tip="Post new blog">
	  	<UnfoldMoreIcon color='primary' />
	  </MyButton>
	);
};

export default BlogDialog;