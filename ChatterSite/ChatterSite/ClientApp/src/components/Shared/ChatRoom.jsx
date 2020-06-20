import * as React from 'react';
import useStyles from "./SharedStyles";
import {Button} from "@material-ui/core";

const ChatRoom = props => {
    const classes = useStyles();
    
    return (
        <div>
            <h4>{props.room}</h4>
            <Button 
                onClick={props.removeRoom}
                className={classes.submit}
                fullWidth={true}
            >Hang Up</Button>
        </div>
    )
}

export default ChatRoom