import { HANDLE_ERROR, LOGOUT, SET_USER } from '../constants';
import { AUTH_SERVER_API } from '../api-endpoints';

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const login = (obj) => {
    return (dispatch) => {
        fetch(AUTH_SERVER_API + 'login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: obj.email, password: obj.password})
        })
            .then(res => res.json())
            .then(body => {
                const loginResponse = JSON.parse(body);
                const {Error, Token, Roles, UserName} = loginResponse;
                if (!Error) {
                    return dispatch({
                            type: SET_USER,
                            token: Token,
                            roles: Roles,
                            error: '',
                            isLoggedIn: true,
                            username: UserName
                        }
                    );                    
                }
                return dispatch({
                    type: HANDLE_ERROR,
                    token: '',
                    error: Error,
                    roles: [],
                    isLoggedIn: false,
                    username: ''
                });
                
            })
            .catch(error => {
                return dispatch({
                    type: HANDLE_ERROR,
                    token: '',
                    error: error.toString(),
                    roles: [],
                    isLoggedIn: false
                });
            });
    };
};