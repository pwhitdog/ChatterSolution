import * as React from 'react';
import {connect} from "react-redux";
import Admin from "./admin/Admin";
import Member from "./member/Member";

const Home = (props) => (
    <div>
        { props.isLoggedIn && props.roles.includes("Admin") &&
            <Admin />
        }
        { props.isLoggedIn && props.roles.includes("Member") &&
            <Member />
        }
        <h1>Log the fuck in!</h1>

    </div>
)

const mapStateToProps = state => {
    return {
        username: state.login.username,
        isLoggedIn: state.login.isLoggedIn,
        roles: state.login.roles
    };
};


export default connect(mapStateToProps, null)(Home)