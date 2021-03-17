// MUI Components
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const MyButton = ({ tip, onClick, buttonClassName, children }) => (
	<Tooltip title={tip} placement='top'>
		<IconButton onClick={onClick} className={buttonClassName}>
			{children}
		</IconButton>
	</Tooltip>
);

export default MyButton;