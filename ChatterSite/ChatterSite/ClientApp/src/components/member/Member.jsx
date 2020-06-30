import * as React from "react";
import {connect} from "react-redux";
import CreateRoomForm from "./CreateRoomForm"
import ChatRoom from "../Shared/ChatRoom"

const Member = props => {
    return (
        <div>
            <h2>Hello {props.username}!</h2>
            { props.room &&
                <ChatRoom />
            }
            { !props.room &&
                <CreateRoomForm  />
            }
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.login.username,
        room: state.room.room,
    };
};

export default connect(mapStateToProps, null)(Member)