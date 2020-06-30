import React from 'react'
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Shared/SharedStyles";
import OurHubConnection from "../Shared/OurHubConnection";
import {bindActionCreators} from "redux";
import {removeRoom, setName, setRoom} from "../../actions/roomAction";
import {connect} from "react-redux";
import CreatePeerConnection from "../Shared/CreatePeerConnection";

const CreateRoomForm = props => {
    const classes = useStyles();
    
    async function createRoom(roomName) {
        const {token, username, actions } = props
        
        const connection = await OurHubConnection(token)
        await connection.start();
        connection.on("Update", data => {
            actions.setRoom(roomName)
            actions.setName(username)
            CreatePeerConnection(JSON.parse(data), username)
        })      
        
        await connection.invoke("CreateCall", username, roomName)
            .catch(err => console.error(err));       
        
    }

    return (
        <Formik
            className={classes.form}
            validateOnChange={true}
            initialValues={{room: ''}}
            onSubmit={async (data, {setSubmitting}) => {
                await createRoom(data.room);
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
            setName,
            removeRoom,
        },                          dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomForm)