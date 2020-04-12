import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Button, 
    CardTitle, Breadcrumb, BreadcrumbItem, 
    Modal, ModalHeader, ModalBody, 
    Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

function renderComments(comments, addComment, dishId) {
      if (comments != null) 
        return(
          <div>
            <h4>Comments</h4>
            {comments.map((c) => {
                  return (
                    <div key={c.id} >
                        <ul className = "list-unstyled">
                          <li>{c.comment}</li>
                          <li>--{c.author},&nbsp;
                            {new Intl.DateTimeFormat
                            ('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format
                            (new Date(Date.parse(c.date)))}
                          </li>
                        </ul>
                    </div>
                  );
              })
            }
            <CommentForm dishId={dishId} addComment={addComment} />
          </div>
        );
      else
        return(
          <div></div>
        );
}

function renderDish(dish) {
    if (dish != null)
        return(
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                  <CardTitle>{dish.name}</CardTitle>
                  <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    else
        return(
            <div></div>
        );
    }



class CommentForm extends Component {

  constructor(props) {
      super(props);

      // when click "comment button", display the form
      this.toggleModal = this.toggleModal.bind(this);
      this.handleComments = this.handleComments.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);

      this.state = {
          isModalOpen: false,
          name: "",
          touched: {
              name: false
          }
      };
  }

  toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

  handleComments(values) {
      this.toggleModal();
      this.props.addComment(this.props.dishId, this.rating.value, this.name.value, this.comment.value);
    }

  handleBlur = (field) => (evt) => {
        this.setState({
          touched: { ...this.state.touched, [field]: true },
        });
    }

  handleInputChange(event) {
        const target = event.target;
        // either store the typed value or the checkbox info
        const value = target.value;
        // name is the fields in this.state
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

  validate(name) {

        const errors = {
            name: ""
        };

        if (this.state.touched.name && name.length < 2)
            errors.name = 'First Name should be >= 2 characters';
        else if (this.state.touched.name && name.length > 15)
            errors.name = 'First Name should be <= 15 characters';
        return errors;
    }

  

    render() {
      const errors = this.validate(this.state.name);

      return (
            <div>
              <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
              <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                      <Form onSubmit={this.handleComments}>
                          <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Input type="select" id="rating" name="rating"
                                innerRef={(input) => this.rating = input}
                                onChange={this.handleInputChange}>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>

                          <FormGroup>
                              <Label htmlFor="name">Your Name</Label>
                              <Input type="name" id="name" name="name"
                                  innerRef={(input) => this.name = input}
                                  placeholder="Your Name"
                                  valid={errors.name === ''}
                                  invalid={errors.name !== ''}
                                  onBlur={this.handleBlur('name')}
                                  onChange={this.handleInputChange}  />
                          </FormGroup>

                          <FormGroup>
                              <Label htmlFor="comment">Comment</Label>
                              <Input type="textarea" id="comment" name="comment"
                                  innerRef={(input) => this.comment = input}
                                  onChange={this.handleInputChange}/>
                          </FormGroup>
                          
                          <Button type="submit" value="submit" color="primary">Submit</Button>
                      </Form>
                    </ModalBody>
                </Modal>
              </div>
            );

      }
  }
 
 const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
              <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>

                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {renderComments(props.comments, props.addComment, props.dish.id)}
                    </div>
                </div>
              </div>
            );
    }
    else {
        return(
            <div>
            </div>
        );
    }
}

export default DishDetail;