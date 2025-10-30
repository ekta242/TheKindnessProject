import React, { useState, useEffect } from "react";
import "./styles.css";
import Nav from "./Nav";
import Notification from "./Notification";
import Points from "./Points";
import Today from "./Today";
import Bridge from "./Bridge";
import Challenge from "./Challenge";



export default function App() {
  const [points, setPoints] = useState(0);
  const [challengePoints, setChallengePoints] = useState(0);
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState("Today");
  const [journalEntries, setJournalEntries] = useState([]);
  const [reflectionEntries, setReflectionEntries] = useState([]);
  const [idea, setIdea] = useState("Write a cute note for someone");

  useEffect(() => {
    const pts = Number(localStorage.getItem("points") || "0");
    const chpts = Number(localStorage.getItem("challengePoints") || "0");
    setPoints(pts);
    setChallengePoints(chpts);
    setJournalEntries(JSON.parse(localStorage.getItem("journalEntries") || "[]"));
    setReflectionEntries(JSON.parse(localStorage.getItem("reflectionEntries") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("points", points.toString());
    localStorage.setItem("challengePoints", challengePoints.toString());
    localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    localStorage.setItem("reflectionEntries", JSON.stringify(reflectionEntries));
  }, [points, challengePoints, journalEntries, reflectionEntries]);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  }

  function handleTaskDone() {
    setPoints(points + 1);
    showNotification("Task marked as done! +1 Point.");
  }

  function handleReflection(text, idea, date, verified) {
    setReflectionEntries([...reflectionEntries, { text, idea, date, verified }]);
    if (verified) {
      setChallengePoints(challengePoints + 1);
      showNotification("Reflection verified! +1 Challenge Point.");
    } else {
      showNotification("Reflection not verified. Try again!");
    }
  }

  function handleJournal(text, date) {
    setJournalEntries([...journalEntries, { text, date }]);
    showNotification("Journal entry saved.");
  }

  function generateNewIdea(newIdea) {
    setIdea(newIdea);
  }

  return (
    <div className="App">
      <Nav current={currentPage} setCurrent={setCurrentPage} />
      {currentPage === "Today" && (
        <Today
          idea={idea}
          onTaskDone={handleTaskDone}
          onReflection={handleReflection}
          onJournal={handleJournal}
          generateNewIdea={generateNewIdea}
          onFiveWordChallenge={() => {}}
          challengePoints={challengePoints}
        />
      )}
      {currentPage === "Points" && (
        <Points points={points} challengePoints={challengePoints} />
      )}
      {currentPage === "Bridge" && (
        <Bridge challengePoints={challengePoints} />
        )}
      <Challenge onComplete={(ok) => { if(ok) setChallengePoints(cp => cp+1); }} notify={showNotification} />
      <Notification message={notification} onClose={() => setNotification(null)} />
    </div>
  );
}
