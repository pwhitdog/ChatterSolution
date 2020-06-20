import * as React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {removeRoom, setRoom} from "../../actions/roomAction";
import CreateRoomForm from "./CreateRoomForm"
import ChatRoom from "../Shared/ChatRoom"

const Member = props => {
    return (
        <div>
            <h2>Hello {props.username}!</h2>
            { props.room &&
                <ChatRoom room={props.room} removeRoom={props.actions.removeRoom}/>
            }
            { !props.room &&
                <CreateRoomForm props={props} />
            }
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.login.username,
        roles: state.login.roles,
        token: state.login.token,
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

export default connect(mapStateToProps, mapDispatchToProps)(Member)