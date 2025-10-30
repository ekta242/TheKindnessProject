import React, { useState } from "react";

function Today({
  idea,
  onTaskDone,
  onReflection,
  onJournal,
  generateNewIdea,
  }) {
  const [reflectionText, setReflectionText] = useState("");
  const [journalText, setJournalText] = useState("");
  const [reflectionVerified, setReflectionVerified] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

function fallbackIdea() {
  const fallbackIdeas = [
    "Write a short note thanking someone who helped you.",
    "Send a compliment to a friend today.",
    "Leave a positive sticky note for a colleague.",
    "Share a small photo and say 'thinking of you' to someone.",
    "Ask someone how their day is going — genuinely."
  ];
  const randomIdea = fallbackIdeas[Math.floor(Math.random() * fallbackIdeas.length)];
  generateNewIdea(randomIdea);
}

async function handleGenerateIdea() {
  setAiLoading(true);
  setAiError(null);

  try {
    // Feature-detect the experimental Chrome on-device AI API
    if (window?.chrome?.ai && typeof window.chrome.ai.prompt === "function") {
      // Try to use the real API
      const response = await window.chrome.ai.prompt({
        model: "gemini-nano",
        prompt: "Generate a short, thoughtful kindness idea that makes both the person doing it and the person (or environment) receiving it feel good. The idea should be simple, real-world, and can include caring for people, animals, or nature.",
        maxTokens: 50,
        //(Alternate propmpts
        // 2. Motivational & Action-Driven (energy + positivity)
        //Prompt:
        //“Suggest one small act of kindness that inspires confidence and positivity in both you and others — 
        //something simple you can do today to make the world a bit better.”)
        //3. Reflective & Empathetic (deep connection)
        //Prompt:
        //“Provide a brief idea for an act of kindness that encourages deep empathy and connection between people — 
        //something meaningful yet simple that can brighten someone’s day.”)
        // You can experiment with different prompts here
      });

      // The API shape may vary — be defensive
      const text = response?.text ?? (typeof response === "string" ? response : null);
      if (text) {
        generateNewIdea(text.trim());
      } else {
        // No text — fall back to local ideas
        console.warn("chrome.ai returned no text, using fallback ideas.");
        fallbackIdea();
      }
    } else {
      // No hardware / API available — use fallback
      fallbackIdea();
    }
  } catch (err) {
    console.error("Idea generation failed:", err);
    // If anything goes wrong, use fallback so demo works
    fallbackIdea();
  } finally {
    setAiLoading(false);
  }
}





  // Verification of reflection using Chrome AI
  async function verifyReflection(txt, task) {
  setAiLoading(true);
  setAiError(null);

  try {
    if (!txt || txt.trim().length === 0) {
      setAiError("Please write your reflection first.");
      return false;
    }

    // ✅ Use Chrome AI if available
    if (window?.chrome?.ai && typeof window.chrome.ai.prompt === "function") {
      const promptText = `You are verifying a kindness reflection. 
Task: "${task}" 
Reflection: "${txt}" 
Respond ONLY with "yes" if the reflection clearly matches the task, otherwise "no".`;

      const response = await window.chrome.ai.prompt({
        model: "gemini-nano",
        prompt: promptText,
        maxTokens: 10,
      });

      const text = response?.text ?? "";
      const isYes = text.toLowerCase().includes("yes");
      return isYes;
    } else {
      // 🚨 No AI hardware — fallback verification
      console.warn("No chrome.ai API detected. Using fallback verification.");
      const lengthOK = txt.trim().split(/\s+/).length > 5; // at least 6 words
      const kindnessWords = ["thank", "help", "smile", "compliment", "listen", "share", "support"];
      const hasKindness = kindnessWords.some((word) =>
        txt.toLowerCase().includes(word)
      );
      return lengthOK && hasKindness;
    }
  } catch (err) {
    console.error("Verification error:", err);
    setAiError("Verification failed. Try manual approval if needed.");
    return false;
  } finally {
    setAiLoading(false);
  }
}



  async function submitReflection() {
    const verified = await verifyReflection(reflectionText, idea);
    setReflectionVerified(verified);
    onReflection(reflectionText, idea, new Date().toISOString(), verified);
    setReflectionText("");
  }

  function submitJournal() {
    onJournal(journalText, new Date().toISOString());
    setJournalText("");
  }

  function submitTaskCompletion() {
    if (!reflectionVerified) {
      alert("Please submit a verified reflection before completing the task.");
      return;
    }
    onTaskDone();
  }

  return (
    <div className="section">
        <h1>The Kindness Project</h1>
        <h2>Daily Journal</h2>
        <p style={{ fontSize: "12px", color: "#ccc" }}>
  *This app uses Chrome's on-device AI (Gemini Nano). If unavailable, fallback and manual demo modes are active.*
        </p>


      <button onClick={handleGenerateIdea} disabled={aiLoading}>
        {aiLoading ? "Generating idea..." : "Generate Idea"}
      </button>
      {aiError && <p style={{ color: "red" }}>{aiError}</p>}

      <p>Idea: {idea}</p>

      <textarea
        placeholder="Write your reflection here..."
        value={reflectionText}
        onChange={(e) => setReflectionText(e.target.value)}
        rows={4}
      />
      <button onClick={submitReflection} disabled={aiLoading}>
        Submit Reflection with AI verification
      </button>
      <button onClick={() => {
            setReflectionVerified(true);
            setAiError(null);
            alert("Reflection manually approved (demo mode).");
          }}
          style={{ marginLeft: "10px" }}
        >
          Manual Approve
        </button>

      {reflectionVerified !== null && (
        <p>
          Reflection Verification:{" "}
          {reflectionVerified ? "Verified ✅" : "Not Verified ❌"}
        </p>
        
      )}

      <textarea
        placeholder="Write your journal entry..."
        value={journalText}
        onChange={(e) => setJournalText(e.target.value)}
        rows={4}
      />
      <button onClick={submitJournal}>Submit Journal</button>

      <button onClick={submitTaskCompletion} disabled={!reflectionVerified}>
        Complete Task
      </button>
    </div>
  );
}

export default Today;
