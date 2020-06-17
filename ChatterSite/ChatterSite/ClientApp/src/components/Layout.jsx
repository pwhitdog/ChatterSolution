import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './navbar/NavMenu';
import Copyright from "./Shared/Copyright";

export default (props) => (
    <React.Fragment>
        <NavMenu/>
        <Container>
            {props.children}
        </Container>
        <Copyright />
    </React.Fragment>
);
