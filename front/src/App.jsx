import "./App.css";
import { useState, useEffect } from "react";
import TopicListing from "./components/TopicListing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SingleTopic from "./components/SingleTopic";
import CreateTopic from "./components/CreateTopic";
function App() {
  const [topics, setTopics] = useState([]);

  const getTopic = async () => {
    fetch("http://localhost:3000/topics").then((response) => {
      response.json().then((responseData) => {
        setTopics(responseData);
      });
    });
  };
  useEffect(() => {
    getTopic();
  }, []);

  let MainPage = () => {
    return (
      <>
        <CreateTopic />
        {topics.map((topic, index) => {
          return <TopicListing key={index} topic={topic} />;
        })}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/topic/:id" element={<SingleTopic />} />
      </Routes>
    </Router>
  );
}

export default App;
