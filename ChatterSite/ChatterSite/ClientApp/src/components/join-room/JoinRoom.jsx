import * as React from "react";
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

const JoinRoom = props => {
    const classes = useStyles();
    
    
    async function joinRoom(data) {
        const { name, room } = data
        console.log(name, room)
        let connection = await OurHubConnection({})
        await connection.start()
        connection.on("Update", data => {
            console.log(data)
            // props.actions.setRoom(room)
            // props.actions.setName(name)
            CreatePeerConnection(JSON.parse(data), name)
        })
        await connection.invoke("Join", name, room)
            .catch(err => console.error(err));        
    }
    
    return (
        <div>
            {
                !props.room &&
                <Formik
                    className={classes.form}
                    validateOnChange={true}
                    initialValues={{room: '', name: ''}}
                    onSubmit={async (data, {setSubmitting}) => {
                        setSubmitting(true);
                        await joinRoom(data);
                        setSubmitting(false);
                    }}>
                    {({values, isSubmitting, error}) => (
                        <Form>
                            <label>Enter the room's name:</label>
                            <ValidatedTextField
                                name="room"
                                type="input"
                                placeholder="Room name"
                                label="Create a room name"
                            />
                            <label>Enter your name:</label>
                            <ValidatedTextField
                                name="name"
                                type="input"
                                placeholder="Your name"
                                label="Enter your name"
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
            }
            
            {props.room && props.room.name &&
            <Button
                onClick={props.removeRoom}
                className={classes.submit}
                fullWidth={true}
            >Hang Up</Button>
            }
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            setRoom,
            setName,
            removeRoom,
        },                          dispatch)
    };
};

export default connect(null, mapDispatchToProps)(JoinRoom)