import React from "react";
const CommentList = ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content =
      comment.status === "pending"
        ? "This comment is awaiting moderation"
        : comment.status === "rejected"
        ? "This comment has been rejected"
        : comment.status === "approved"
        ? comment.content
        : "";
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
