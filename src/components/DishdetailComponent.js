import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


class DishDetail extends Component {

  renderDish(dish) {
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

    renderComments(comments) {
      if (comments != null) 
        return(
          <div>
            <h4>Comments</h4>
            {comments}
          </div>
        );
      else
        return(
          <div></div>
        );
    }

    render() {

      const comments = this.props.comments.map((c) => {
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
        });

        return (
            <div className="container">
                <div className="row">
                  <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                  </div>
                  <div className="col-12 col-md-5 m-1">
                    {this.renderComments(comments)}
                  </div>
                </div>
            </div>
        );
    }
}

export default DishDetail;