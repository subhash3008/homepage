import React from 'react';
import { connect } from 'react-redux';

import styles from './RecipeDetails.module.scss';
import { 
    getRandomRecipeList, 
    getRecipeInfoById, 
    saveToFavourites 
} from '../../../actions';
import Loader from '../../loader/Loader';

class RecipeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {recipe: null, isRecipePresent: true};
    }

    componentDidMount() {
        this.performIdCheck();
    }

    componentDidUpdate() {
        this.performIdCheck('update');
    }

    saveRecipeToFavourites = () => {
        if (this.state.recipe) {
            this.props.saveToFavourites(this.state.recipe);
        } else {
            console.error('No recipe to save.', this.state);
        }
    }

    performIdCheck = (flag = '') => {
        const recipeId = this.props.match.params.id;
        if (!flag) {
            if (this.props.recipeList && this.props.recipeList.length) {
                const recipe = this.props.recipeList.filter(el => el.id === +recipeId)[0];
                if (recipe) {
                    this.setState({recipe, isRecipePresent: true});
                } else {
                    this.setState({recipe: null, isRecipePresent: false});
                    this.props.getRecipeInfoById(recipeId);
                }
            } else {
                this.props.getRecipeInfoById(recipeId);
            }
        } else if (flag === 'update' && !this.state.recipe) {
            const recipe = this.props.recipeList.filter(el => el.id === +recipeId)[0];
            if (recipe) {
                this.setState({recipe, isRecipePresent: true});
            }
        }
    }

    renderIngredients = () => {
        return this.state.recipe.extendedIngredients.map(el => {
            return (
                <li className={styles.RecipeDetails__Ingredients__Item} key={el.original}>
                    <p>{el.original.substring(0, 1).toUpperCase() + el.original.substring(1)}</p>
                </li>
            );
        });
    }

    renderIndividualInstructions = (steps) => {
        if (steps.length) {
            return steps.map(el => {
                return (
                    <li key={el.step}>
                        <p>{el.step}</p>
                    </li>
                );
            });
        }
    }

    renderInstructions = () => {
        return this.state.recipe.analyzedInstructions.map((el, index) => {
            return (
                <li className={styles.RecipeDetails__Instructions__Item} key={el.name + index}>
                    <h3>{el.name || '-'}</h3>
                    <ol>
                        {this.renderIndividualInstructions(el.steps)}
                    </ol>
                </li>
            );
        });
    }

    render() {
        if (this.props.isLoading) {
            return <Loader />;
        }
        if (this.state.recipe) {
            return (
                <div className={styles.RecipeDetails}>
                    <div className={styles.RecipeDetails__Title}>
                        <h2>{this.state.recipe.title || ''}</h2>
                    </div>
                    <div className={styles.RecipeDetails__Img}>
                        <img src={this.state.recipe.image || ''} alt={this.state.recipe.title}></img>
                    </div>
                    <div className={styles.RecipeDetails__Info}>
                        <div className={styles.RecipeDetails__Info__Item}>
                            <div className={styles.RecipeDetails__Info__Item__Icon}>
                                <img src="/images/good.png" alt="likes"></img>
                            </div>
                            <div className={styles.RecipeDetails__Info__Item__Value}>
                                {this.state.recipe.aggregateLikes || 0} Likes
                            </div>
                        </div>
                        <div className={styles.RecipeDetails__Info__Item}>
                            <div className={styles.RecipeDetails__Info__Item__Icon}>
                                <img src="/images/scoreboard.png" alt="spoonacular score"></img>
                            </div>
                            <div className={styles.RecipeDetails__Info__Item__Value}>
                                {this.state.recipe.spoonacularScore || 0} %
                            </div>
                        </div>
                        <div className={styles.RecipeDetails__Info__Item}>
                            <div className={styles.RecipeDetails__Info__Item__Icon}>
                                <img src="/images/health.png" alt="health score"></img>
                            </div>
                            <div className={styles.RecipeDetails__Info__Item__Value}>
                                {this.state.recipe.healthScore || 0} %
                            </div>
                        </div>
                    </div>
                    <div className={styles.RecipeDetails__Summary}>
                        <span dangerouslySetInnerHTML={{__html: this.state.recipe.summary || ''}}></span>
                    </div>
                    <div className={styles.RecipeDetails__Ingredients}>
                        <h3 className={styles.RecipeDetails__Ingredients__Title}>
                            Ingredients
                        </h3>
                        <ul>
                            {this.renderIngredients()}
                        </ul>
                    </div>
                    <div className={styles.RecipeDetails__Instructions}>
                        <h3 className={styles.RecipeDetails__Instructions__Title}>
                            Instructions
                        </h3>
                        <ul>
                            {this.renderInstructions()}
                        </ul>
                    </div>
                    <div className={styles.RecipeDetails__AddInfo}>
                        <p>
                            Recipe By : {this.state.recipe.sourceName}
                        </p>
                    </div>
                    {/* Recipe Details
                    {this.state.recipe && this.state.recipe.id || null} */}
                    <div className={styles.RecipeDetails__Fav} onClick={this.saveRecipeToFavourites}>
                        <img src="/images/bookmark.svg" className={styles.RecipeDetails__Fav__Img}></img>
                    </div>
                </div>
            );
        }
        return (
            <div className={styles.NoRecipe}>
                No recipe found with this id.
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipeList: state.recipe && state.recipe.recipeList,
        isLoading: state.loading && state.loading.loading
    };
}

const mapStateToDispatch = {
    getRandomRecipeList,
    getRecipeInfoById,
    saveToFavourites
}

export default connect(
    mapStateToProps, 
    mapStateToDispatch
)(RecipeDetails);