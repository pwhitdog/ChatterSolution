import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(http://brand.san.org/wp-content/uploads/2015/05/Digital-loGO-RGB_stacked.png)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        // backgroundSize: 'cover',
        backgroundPosition: 'top',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    fullWidth: {
        width: '100%'
    },
    error: {
      color: 'red',
      textAlign: 'center',  
    },
    copyright: {
        position: 'absolute',
        bottom: '10px',
    }
}));

export default useStyles