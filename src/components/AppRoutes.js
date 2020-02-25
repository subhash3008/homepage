import React from 'react';
import { Router, Switch, Route } from 'react-router';

import history from '../history';
import Header from './Header/Header';
import Homepage from './Homepage/Homepage';
import Recipe from './recipe/Recipe';
import RecipeDetails from './recipe/details/RecipeDetails';

const AppRoutes = (props) => {
    return (
        <React.Fragment>
            <Router history={history}>
                <Header hourOfDay={props.hourOfDay} setWeather={props.setWeather}/>
                <Switch>
                    <Route path="/" exact component={() => <Homepage hourOfDay={props.hourOfDay} weatherData={props.weatherData} isHomePage={props.isHomePage}/>} />
                    <Route path="/recipe" exact component={Recipe} />
                    <Route path="/recipe/details" exact component={RecipeDetails} />
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default AppRoutes;