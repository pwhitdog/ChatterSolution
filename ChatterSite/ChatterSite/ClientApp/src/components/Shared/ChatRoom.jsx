import * as React from 'react';
import useStyles from "./SharedStyles";
import {Button} from "@material-ui/core";
import {bindActionCreators} from "redux";
import {removeRoom, setRoom} from "../../actions/roomAction";
import {connect} from "react-redux";

const ChatRoom = props => {
    const classes = useStyles();
    
    return (
        <div>
            <h4>{props.room}</h4>
            <Button 
                onClick={props.actions.removeRoom}
                className={classes.submit}
                fullWidth={true}
            >Hang Up</Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.login.username,
        room: state.room.room,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            setRoom,
            removeRoom
        },                          dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom)