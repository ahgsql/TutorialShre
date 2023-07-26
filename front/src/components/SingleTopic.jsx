import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
export default function SingleTopic() {
  const [data, setData] = useState({});
  let { id } = useParams();
  const getTopic = async () => {
    fetch("http://localhost:3000/topic/" + id).then((response) => {
      response.json().then((responseData) => {
        console.log(responseData);
        setData(responseData);
      });
    });
  };
  useEffect(() => {
    getTopic();
  }, []);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div className="singleTopic">
      <span className="title">
        {data.topicname} by {data.author}
      </span>
      <div className="content"> {data.content}</div>
      <div className="links">
        {data &&
          data.links &&
          data.links.map((link) => {
            let id = link.link.split("v=")[1];
            return <YouTube videoId={id} opts={opts} />;
          })}
      </div>
    </div>
  );
}
