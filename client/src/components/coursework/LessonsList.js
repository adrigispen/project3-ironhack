import React, { Component } from "react";
import { getDay, getCards } from "../../services/courseworkService";
import { Form } from "react-bootstrap";

// this is for testing purposes only
import CommentBox from '../comments/CommentBox';

class LessonsList extends Component {
  state = {
    lessons: [],
    templessons: []
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    let id = this.props.match.params.id;
    getDay(id)
      .then(response => {
        console.log(response);
        this.setState({ lessons: response.cards, name: response.name });
      })
      .catch(err => {
        console.log(err);
      });
    getCards().then(response => {
      this.setState({ templessons: response });
    });
  }

  render() {
    return (
      <div className="list-container">
        <p>{this.state.name}</p>
        <ul className="list-primary">
          {this.state.templessons.length > 0 &&
            this.state.templessons.map(el => (
              <div key={el.id} className="list-item">
                <a href={el.attachments[0]}>{el.name}</a>
                <div className="tags">
                  {el.labels.map((label, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: `${label.color}` }}
                    >
                      {label.name}
                    </span>
                  ))}
                  {el.technology && (
                    <span className="technology">{el.technology}</span>
                  )}
                </div>
                <Form>
                  <Form.Group controlId="statusCheckbox">
                    <Form.Check type="checkbox" label="" />
                  </Form.Group>
                </Form>
              </div>
            ))}
        </ul>
        {/* this is for testing purposes only */}
        <CommentBox />
      </div>
    );
  }
}

export default LessonsList;
