import React from 'react'
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Shared/SharedStyles";
import OurHubConnection from "../Shared/OurHubConnection";

const CreateRoomForm = props => {
    const classes = useStyles();
    
    async function createRoom(roomName) {
        const {token, username, actions } = props.props
        const connection = await OurHubConnection(token)
        await actions.setRoom(roomName)
        await connection.invoke("CreateCall", username, roomName)
            .catch(err => console.error(err));
        
    }

    return (
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
    )
}

export default CreateRoomForm