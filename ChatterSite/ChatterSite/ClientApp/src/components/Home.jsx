import * as React from 'react';
import {connect} from "react-redux";
import Member from "./member/Member";
import JoinRoom from "./join-room/JoinRoom";

const Home = props => (
    <div>
        { props.isLoggedIn && props.roles.includes("Member") &&
            <Member />
        }
        { !props.isLoggedIn && !props.room &&
            <JoinRoom />
        }        

    </div>
)

const mapStateToProps = state => {
    return {
        username: state.login.username,
        isLoggedIn: state.login.isLoggedIn,
        roles: state.login.roles,
        room: state.room.room,
    };
};


export default connect(mapStateToProps, null)(Home)