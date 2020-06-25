import React from "react";
import {connect} from "react-redux";
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { AUTH_SERVER_API_ACCOUNT} from "../../api-endpoints";
import useStyles from "../Shared/SharedStyles";

const CreateMemberForm = props => {
    const classes = useStyles();
    
    async function createUser(data) {
        const { email, userName, password, role } = data
        console.log(data)
        fetch(
            AUTH_SERVER_API_ACCOUNT + 'Create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
                body: JSON.stringify({ email, userName, password, role})
            }
        )
            .then(res => console.log(res.json()))            
            .catch(x => console.log(`Error: ${x}`))
    }
    
    return (
        <div>
            <Formik
                className={classes.form}
                validateOnChange={true}
                initialValues={{email: '', userName: '', password: '', role: ''}}
                onSubmit={async (data, {setSubmitting}) => {
                    setSubmitting(true);
                    await createUser(data);
                    setSubmitting(false);
                }}>
                {({values, isSubmitting, error}) => (
                    <Form>
                        <label>Enter the email:</label>
                        <ValidatedTextField
                            name="email"
                            type="input"
                            placeholder="Email Address"
                            label="Enter the email"
                        />
                        <label>Enter the Member's Name:</label>
                        <ValidatedTextField
                            name="userName"
                            type="input"
                            placeholder="Member Name"
                            label="Enter the Member's Name"
                        />
                        <label>Enter the Member's Password:</label>
                        <ValidatedTextField
                            name="password"
                            type="password"
                            placeholder="Member Password"
                            label="Enter the Member's Password"
                        />
                        <label>Enter the Member's Role:</label>
                        <ValidatedTextField
                            name="role"
                            type="role"
                            placeholder="Member Role"
                            label="Enter the Member's Role"
                        />
                        
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={classes.submit}
                            fullWidth={true}
                        >Join Room
                        </Button>
                        <Typography className={classes.error} variant="h5">Please check the name and enter it again</Typography>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
    };
};


export default connect(mapStateToProps, null)(CreateMemberForm)