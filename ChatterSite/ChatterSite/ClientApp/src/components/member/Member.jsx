import * as React from "react";
import {connect} from "react-redux";
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Shared/SharedStyles";
import {OurHubConnection} from "../Shared/OurHubConnection";

const Member = props => {
    const classes = useStyles();
    
    async function createRoom(roomName) {
        const connection = await OurHubConnection(props)
        console.log(connection)
        await connection.invoke("CreateCall", props.username, roomName)
            .catch(err => console.error(err));
    }  
    
    return (
        <div>
            <h2>Hello {props.username}!</h2>
            
            <Formik
                className={classes.form}
                validateOnChange={true}
                initialValues={{room: ''}}
                onSubmit={async (data, {setSubmitting}) => {
                    setSubmitting(true);
                    await createRoom(data.room);
                    setSubmitting(false);
                }}>
                {({values, isSubmitting, error}) => (
                    <Form>
                        <label>Start a room</label>
                        <ValidatedTextField
                            name="room"
                            type="input"
                            placeholder="Room Name"
                            label="Create a room name"
                        />
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className={classes.submit}
                            fullWidth={true}
                        >Create Room
                        </Button>
                        <Typography className={classes.error} variant="h5">{props.error}</Typography>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.login.username,
        isLoggedIn: state.login.isLoggedIn,
        roles: state.login.roles,
        token: state.login.token,
    };
};


export default connect(mapStateToProps, null)(Member)