import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loadSinglePost, loadEditPost } from "../actions";
import Loading from "./Loading";

class EditPost extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const id = this.props.post.id;
    const title = this.inputTitle.value;
    const body = this.inputBody.value;

    this.props.loadEditPost(id, title, body);
    this.props.history.goBack();
  };

  render() {
    const { post } = this.props;
    console.log(this.props);
    return (
      <div className='main-body'>
        {post === null ? (
          <Loading />
        ) : (
          <form onSubmit={this.handleSubmit} className='form-edit'>
            <fieldset>
              <legend>Edit Post</legend>
              <label>
                Title:
                <br />
                <input
                  type='text'
                  defaultValue={post.title}
                  required='true'
                  ref={(inputTitle) => (this.inputTitle = inputTitle)}
                />
              </label>
              <br />
              <label>
                Content:
                <br />
                <textarea
                  defaultValue={post.body}
                  required='true'
                  ref={(inputBody) => (this.inputBody = inputBody)}
                />
              </label>
              <p>
                Author: <strong>{post.author}</strong>
              </p>
              <button type='submit'>Submit</button>
              <Link to='/'>
                <button className='btn-cancel'>Cancel</button>
              </Link>
            </fieldset>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.post_id;
  const post = state.postsReducer[id];

  return { post };
};

EditPost = connect(mapStateToProps, { loadSinglePost, loadEditPost })(EditPost);

export default EditPost;
