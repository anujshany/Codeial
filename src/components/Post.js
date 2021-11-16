import React from "react";
import { Link } from "react-router-dom";
import { Comment } from ".";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createComment, toggleLike } from "../actions/posts";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleAddComment = (event) => {
    const { comment } = this.state;
    const { post } = this.props;
    if (event.key === "Enter") {
      this.props.dispatch(createComment(comment, post._id));
      this.setState({
        comment: "",
      });
    }
  };

  handleOnCommentChange = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  handlePostLike = () => {
    this.props.dispatch(
      toggleLike(this.props.post._id, "Post", this.props.user._id)
    );
  };

  render() {
    const { post, user } = this.props;
    const { comment } = this.state;
    const isPostLikedByUser = post.likes.includes(user._id);
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/user/${post.user._id}`}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="user-pic"
              />
            </Link>{" "}
            <div>
              <span className="post-author"> {post.user.name} </span>{" "}
              <span className="post-time"> A minute ago </span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="post-content"> {post.content} </div>{" "}
          <div className="post-actions">
            {" "}
            {/* post likes */}{" "}
            <button className="post-like no-btn" onClick={this.handlePostLike}>
              {isPostLikedByUser ? (
                <img
				src="https://cdn-icons.flaticon.com/png/512/2956/premium/2956779.png?token=exp=1636793181~hmac=2b2c8108f93aa08aa7e5a0da7a509c0e"
				alt="likes-icon"
			  />
              ) : (
				<img
				src="https://cdn-icons.flaticon.com/png/512/2956/premium/2956779.png?token=exp=1636793181~hmac=2b2c8108f93aa08aa7e5a0da7a509c0e"
				alt="likes-icon"
			  />
              )}
              <span> {post.likes.length} </span>{" "}
            </button>{" "}
            {/* post comments */}{" "}
            <div className="post-comments-icon">
			<img
                    src="https://cdn-icons.flaticon.com/png/512/1947/premium/1947247.png?token=exp=1636793223~hmac=bf99ac1afeb22da95dab170d944a9f02"
                    alt="comments-icon"
                  />
              <span> {post.comments.length} </span>{" "}
            </div>{" "}
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Add a comment..."
              onChange={this.handleOnCommentChange}
              onKeyPress={this.handleAddComment}
              value={comment}
            />{" "}
          </div>
          <div className="post-comments-list">
            {" "}
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment._id} postId={post._id} />
            ))}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

Post.propTypes = {
  posts: PropTypes.object,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Post);
