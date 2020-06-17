import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import useStyles from "./SharedStyles";

const Copyright = () => {
    const classes = useStyles();

    return (
        <Typography variant="body2" color="textSecondary" align="center" className={classes.copyright}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Chatter it up Productions
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright