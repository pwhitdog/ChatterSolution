import React, {useState} from "react";
import { bindActionCreators,  } from "redux";
import { connect, } from 'react-redux';
import {Formik, Form,} from "formik";
import { Button } from "@material-ui/core";
import { ValidatedTextField } from "../Shared/ValidatedTextField";
import { login } from "../../actions/loginAction";
import loginValidationSchema from "../../Validations/LoginValidation";
import useStyles from "./LoginStyles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Copyright from "../Shared/Copyright";

const Login = props => {
    const classes = useStyles();
    const [setToNext] = useState(false);

    if(props.isLoggedIn) {
        if (props.roles.includes("Admin")) {
            window.location.href = '/admin'
        } else {
            window.location.href = '/'
        }
        
    }
    
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Formik
                        className={classes.form}    
                        validateOnChange={true}
                        initialValues={{email: '', password: ''}}
                        validationSchema={loginValidationSchema}
                        onSubmit={async (data, {setSubmitting}) => {
                            setSubmitting(true);
                            await props.actions.login(data);
                            setSubmitting(false);
                            setToNext(props.isLoggedIn);                            
                    }}>
                        {({values, isSubmitting, error}) => (
                            <Form>
                                {/*{toNext ? <Redirect to="/" /> : null}*/}
                                <ValidatedTextField
                                    name="email"
                                    type="input"
                                    placeholder="Email Address"                                    
                                    label="Email Address"
                                />
                                <ValidatedTextField
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                />
                                <Button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={classes.submit}
                                    fullWidth={true}
                                >Login
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                                <Typography className={classes.error} variant="h5">{props.error}</Typography>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Grid>
        </Grid>
    )
};

const mapStateToProps = state => {
    return {
        error: state.login.error,
        isLoggedIn: state.login.isLoggedIn,
        roles: state.login.roles,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            login,
        },                          dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);