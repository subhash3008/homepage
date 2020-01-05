import React from 'react';
import { Router, Switch, Route } from 'react-router';

import history from '../history';
import Header from './Header/Header';
import Homepage from './Homepage/Homepage';

const AppRoutes = (props) => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header hourOfDay={props.hourOfDay}/>
                <Switch>
                    <Route path="/" exact component={() => <Homepage hourOfDay={props.hourOfDay}/>} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default AppRoutes;