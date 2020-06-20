import * as React from "react";
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Shared/SharedStyles";
import OurHubConnection from "../Shared/OurHubConnection";
import {bindActionCreators} from "redux";
import {setRoom} from "../../actions/roomAction";
import {connect} from "react-redux";

const JoinRoom = props => {
    const classes = useStyles();
    
    async function joinRoom(data) {
        const { name, room } = data
        const connection = await OurHubConnection({})
        console.log(connection)
        await connection.invoke("Join", name, room)
            .catch(err => console.error(err));
        props.actions.setRoom(data.room)
    }
    return (
        <div>
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
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            setRoom,
        },                          dispatch)
    };
};

export default connect(null, mapDispatchToProps)(JoinRoom)