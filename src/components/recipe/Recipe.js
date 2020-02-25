import React from "react";
import { connect } from "react-redux";

import styles from "./Recipe.module.scss";
import { getRandomRecipeList } from '../../actions';
import history from '../../history';

class Recipe extends React.Component {
    queryParams = {
        tags: 'vegetarian',
        number: 100
    }
    componentDidMount() {
        // console.log("REcipe component :", this.state, this.props);
        // console.log(this.props.recipe && this.props.recipe.recipeList && this.props.recipe.recipeList.length);
        if (!(this.props.recipe && this.props.recipe.recipeList && this.props.recipe.recipeList.length)) {
            this.props.getRandomRecipeList({...this.queryParams});
        }
    }

    goToDetailPage = (recipe) => {
        if (recipe && recipe.id) {
            console.log('Going to :', `/recipe/details${recipe.id}`);
            history.push(`/recipe/details/${recipe.id}`);
        }
    }

    renderRecipeList = () => {
        if (this.props.recipe && this.props.recipe.recipeList && this.props.recipe.recipeList.length) {
            return this.props.recipe.recipeList.map(el => {
                return (
                    <div className={styles.Recipe__Item} key={el.id + el.title}>
                        <div className={styles.Recipe__Item__Img}>
                            <img src={el.image} alt={el.title}></img>
                        </div>
                        <div className={styles.Recipe__Item__Body}>
                            <div className={styles.Recipe__Item__Body__Title}>
                                {el.title || ''}
                            </div>
                            <div className={styles.Recipe__Item__Body__Props}>
                                <div className={styles.Recipe__Item__Body__Props__Item}>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Title}>
                                        Liked By
                                    </div>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Value}>
                                        {el.aggregateLikes || 0}
                                    </div>
                                </div>
                                <div className={styles.Recipe__Item__Body__Props__Item}>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Title}>
                                        Spoonacular Score
                                    </div>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Value}>
                                        {el.spoonacularScore || 0} %
                                    </div>
                                </div>
                                <div className={styles.Recipe__Item__Body__Props__Item}>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Title}>
                                        Ready In
                                    </div>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Value}>
                                        {el.readyInMinutes || 0} Mins
                                    </div>
                                </div>
                                <div className={styles.Recipe__Item__Body__Props__Item}>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Title}>
                                        Servings
                                    </div>
                                    <div className={styles.Recipe__Item__Body__Props__Item__Value}>
                                        {el.servings || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.Recipe__Item__Footer}>
                            <button className={styles.Recipe__Item__Footer__Btn} onClick={() => this.goToDetailPage(el)}>
                                View Recipe
                            </button>
                        </div>
                    </div>
                );
            });
        }
    }

    renderRefreshBtn() {
        return (
            <div className={styles.Recipe__Footer}>
                <button className={styles.Recipe__Footer__Btn}>Get More Recipes</button>
            </div>
        );
    }
    render() {
        // console.log("REcipe component render :", this.state, this.props);
        return (
            <div className={styles.Recipe}>
                {this.renderRecipeList()}
                {this.renderRefreshBtn()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { recipe: state.recipe };
};

const mapDispatchToProps = {
    getRandomRecipeList
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Recipe);
