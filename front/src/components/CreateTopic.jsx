import React, { useRef } from "react";

export default function CreateTopic() {
  let titleRef = useRef();
  let contentRef = useRef();
  let authorRef = useRef();
  const handleAddTopic = () => {
    let title = titleRef.current.value;
    let content = contentRef.current.value;
    let author = authorRef.current.value;

    fetch("http://localhost:3000/topic", {
      method: "POST",
      body: JSON.stringify({ topicname: title, content, author }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  return (
    <div>
      <form>
        <label>Title</label>
        <br />
        <input type="text" name="title" ref={titleRef}></input>
        <hr />
        <label>Content</label>
        <br />
        <textarea name="content" ref={contentRef}></textarea>
        <hr />
        <label>Author</label>
        <br />
        <input type="text" name="author" ref={authorRef}></input>
        <hr />
        <button type="button" onClick={handleAddTopic}>
          Add Topic
        </button>
      </form>
    </div>
  );
}
