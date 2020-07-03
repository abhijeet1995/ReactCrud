import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles';

export default function Snakebar({ message, type, open, close, key }) {

	// const [state, setState] = React.useState({
	//   open: false,
	//   vertical: 'top',
	//   horizontal: 'center',
	// });

	const color = {
		success: "#03C58D",
		error: "#FF5847"
	}

	const useStyles = makeStyles(theme => ({
		root: {
			'& .MuiSnackbarContent-root': {
				backgroundColor: color[type]
			}
		},
	}));


	const classes = useStyles();

	return (
		<div>
			<Snackbar
				className={classes.root}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				key={key}
				open={open}
				onClose={close}
				message={message}
				action={
					<React.Fragment>
						<IconButton
							aria-label="close"
							color="inherit"
							onClick={close}
						>
							<CloseIcon />
						</IconButton>
					</React.Fragment>
				}
			/>
		</div>
	);
}
