import React from 'react';
import { connect } from 'react-redux';

import styles from './RecipeDetails.module.scss';

class RecipeDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {recipe: null, isRecipePresent: true};
    }

    componentDidMount() {
        const recipeId = this.props.math.params.id;
        console.log('recipeId : ', recipeId);
        if (this.props.recipeList && this.props.recipeList.length) {
            const recipe = this.props.recipeList.filter(el => el.id === recipeId)[0];
            if (recipe) {
                this.setState({recipe, isRecipePresent: true});
            } else {
                this.setState({recipe: null, isRecipePresent: false});
            }
        }
    }

    render() {
        console.log('details render props : ', this.props);
        console.info('details render state : ', this.state);
        return (
            <div className={styles.RecipeDetails}>
                Recipe Details
                {this.state.recipe.id || null}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recipeList: state.recipe && state.recipe.recipeList
    };
}

export default connect(mapStateToProps, null)(RecipeDetails);