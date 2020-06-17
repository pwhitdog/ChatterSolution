import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/login/Login';

import './custom.css'
import Admin from "./components/admin/Admin";
import {requireAdminAuthentication} from "./components/Shared/adminAuthentication";


export default () => (
    <Layout>
        <Route exact path='/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/admin' component={requireAdminAuthentication(Admin)} />
    </Layout>
);
