import React from 'react';
import { connect } from 'react-redux';

import styles from './RecipeDetails.module.scss';
import { getRandomRecipeList, getRecipeInfoById } from '../../../actions';

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

    performIdCheck = (flag = '') => {
        const recipeId = this.props.match.params.id;
        console.log('recipeId : ', recipeId);
        if (!flag) {
            if (this.props.recipeList && this.props.recipeList.length) {
                const recipe = this.props.recipeList.filter(el => el.id === +recipeId)[0];
                console.log('RECIPE :', recipeId, recipe);
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
            console.log('RECIPE :', recipeId, recipe);
            if (recipe) {
                this.setState({recipe, isRecipePresent: true});
            }
        }
    }

    render() {
        console.log('details render props : ', this.props);
        console.info('details render state : ', this.state);
        return (
            <div className={styles.RecipeDetails}>
                Recipe Details
                {this.state.recipe && this.state.recipe.id || null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipeList: state.recipe && state.recipe.recipeList
    };
}

const mapStateToDispatch = {
    getRandomRecipeList,
    getRecipeInfoById
}

export default connect(
    mapStateToProps, 
    mapStateToDispatch
)(RecipeDetails);