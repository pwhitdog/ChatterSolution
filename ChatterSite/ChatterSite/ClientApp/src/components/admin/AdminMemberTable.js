import React, {useEffect, useState} from "react";
import {AUTH_SERVER_API} from "../../api-endpoints";
import {TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import {connect} from "react-redux";

const AdminMemberTable = props => {
    const [data, setData] = useState([]);
    console.log(props)
    useEffect(() => {
        fetch(
            AUTH_SERVER_API + 'Members', {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${props.token}`
                },
            }
        )
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
            .catch(e => console.log("Error: ", e))
    },[]);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(m =>(
                        <TableRow key={m.id}>
                            <TableCell>{m.name}</TableCell>
                            <TableCell>{m.email}</TableCell>
                            <TableCell>{m.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </TableContainer>
    );
}

const mapStateToProps = state => {
    return {
        token: state.login.token,
    };
};


export default connect(mapStateToProps, null)(AdminMemberTable)