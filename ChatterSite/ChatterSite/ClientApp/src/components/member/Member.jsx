import * as React from "react";
import {connect} from "react-redux";
import loginValidationSchema from "../../Validations/LoginValidation";
import {Form, Formik} from "formik";
import {ValidatedTextField} from "../Shared/ValidatedTextField";
import {Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import useStyles from "../Shared/SharedStyles";
import * as signalR from "@microsoft/signalr";
import {useState} from "react";

const Member = props => {
    const classes = useStyles();
    const [toNext, setToNext] = useState(false);

    const options = {
        accessTokenFactory: () => {
            return props.token;
        }
    };

    const connection = new signalR.HubConnectionBuilder()
        .withUrl(`/chatHub`, {
            accessTokenFactory: () => {
                return `${props.token}`
            }
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();

    async function start() {
        try {
            await connection.start();
            console.log("connected");
            connection.on("Update", (data) => console.log(data, '*****'))
        } catch (err) {
            console.log(err);
            setTimeout(() => start(), 5000);
        }
    }
    
    async function createRoom(roomName) {
        await connection.invoke("CreateCall", props.username, roomName).catch(err => console.error(err));
    }
    
    start();
    
    return (
        <div>
            <h2>Hello {props.username}!</h2>
            <Formik
                className={classes.form}
                validateOnChange={true}
                initialValues={{room: ''}}
                // validationSchema={loginValidationSchema}
                onSubmit={async (data, {setSubmitting}) => {
                    // setSubmitting(true);
                    console.log("test")
                    await createRoom(data.room);
                    // setSubmitting(false);
                    // setToNext(props.isLoggedIn);
                }}>
                {({values, isSubmitting, error}) => (
                    <Form>
                        {/*{toNext ? <Redirect to="/" /> : null}*/}
                        <ValidatedTextField
                            name="room"
                            type="input"
                            placeholder="room name"
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