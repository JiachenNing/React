import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import Contact from './ContactComponent';
import About from './AboutComponent';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

// map redux store state into props
// that are available for components
const mapStateToProps = state => {
  return {
    // dishes containing 3 properties (defined in dishes.js): 
    // isLoading, errMess, dishes
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    // fetch dishes and load into redux store
    // fetchDishes is a thunk, dispatch it so can be used in Main Component
    fetchDishes: () => { dispatch(fetchDishes())},
    // form labelled as "feedback"
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos())
  });

class Main extends Component {

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  // when main component is mounted in view
  // fetchDishes will be called
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    const HomePage = () => {
      console.log("HOME error:", this.props.dishes.errMess)
      console.log("HOME is loading:", this.props.dishes.isLoading)
      return(
           <Home 
              dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}

              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}

              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
            comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess}
            postComment={this.props.postComment}
          />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => 
                <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/> 
            } />
              <Route exact path='/aboutus' component={() => 
                <About leaders={this.props.leaders}/>
            } />
              <Route exact path='/contactus' component={() => 
                <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            } />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

// connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));

