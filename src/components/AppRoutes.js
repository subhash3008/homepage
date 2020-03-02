import React from 'react';
import { Router, Switch, Route } from 'react-router';

import history from '../history';
import Header from './Header/Header';
import Homepage from './Homepage/Homepage';
import Recipe from './recipe/Recipe';
import RecipeDetails from './recipe/details/RecipeDetails';
import Countries from './countries/Countries';
import Sip from './sip/Sip';

const AppRoutes = (props) => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header hourOfDay={props.hourOfDay} />
                <Switch>
                    <Route path="/" exact component={() => <Homepage hourOfDay={props.hourOfDay} />} />
                    <Route path="/recipe" exact component={Recipe} />
                    <Route path="/recipe/details/:id" exact component={RecipeDetails} />
                    <Route path="/countries" exact component={Countries} />
                    <Route path="/sip" exact component={Sip} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default AppRoutes;