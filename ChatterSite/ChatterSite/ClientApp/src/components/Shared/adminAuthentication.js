import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';

export function requireAdminAuthentication(Component) {

    class AdminAuthentication extends React.Component {

        componentWillMount() {
            this.checkAuth()
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth()
        }

        checkAuth() {
            if (!this.props.isAuthenticated || !this.props.roles.includes("Admin")) {
                this.props.dispatch(push(`/login`, null))
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            )

        }
    }

    const mapStateToProps = state => ({
        roles: state.login.roles,
        userName: state.login.username,
        isAuthenticated: state.login.isLoggedIn
    });

    return connect(mapStateToProps)(AdminAuthentication)
}