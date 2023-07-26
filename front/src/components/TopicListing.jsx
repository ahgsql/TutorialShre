import React from "react";
import "./TopicListing.css";
export default function TopicListing({ topic }) {
  return (
    <div className="topic-listing">
      <span className="title">{topic.topicname}</span>
      <div className="info">
        <span>{topic.content}</span> <span>{topic.author}</span>
      </div>
    </div>
  );
}
