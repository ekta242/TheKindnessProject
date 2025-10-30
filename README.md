# 🌌 The Kindness Project  
🏆 Built for the Google Chrome Built-in AI Challenge 2025  

The **Kindness Project** is a journaling web app designed to inspire small daily acts of kindness — powered by the experimental **Gemini Nano** on-device AI (`window.chrome.ai.prompt()`).

The app generates ideas for acts of kindness, allows users to reflect on them, and verifies reflections locally using the new Chrome AI APIs.  
It also includes a demo/fallback mode so the app can run even on systems that don’t yet support Gemini Nano hardware.

---

## 💡 Features

### ✨ AI-Generated Kindness Ideas  
- Uses `window.chrome.ai.prompt()` to generate unique daily kindness prompts (e.g., “Send a note to thank a friend”).  
- Automatically switches to local fallback ideas if hardware isn’t available.  

### 🧠 Reflection Verification (AI or Demo Mode)  
- Verifies whether your reflection genuinely matches your kindness task — via **Gemini Nano** when available, or a local keyword-based fallback otherwise.  

### 🪄 Manual Approval Mode  
- Added for hackathon demo: manually verify reflections when AI hardware isn’t accessible.  

### 📝 Daily Journaling System  
- Save your reflections, personal notes, and progress.  

### 🎮 Points & Progress System  
- Completing verified reflections awards points, visually represented as a growing “bridge of kindness.”  

---

##  AI Mode vs Demo Mode  

This project is built around Chrome’s **on-device AI API** (`window.chrome.ai.prompt()`), part of the experimental Gemini Nano ecosystem.  

Since not all devices currently support Gemini Nano hardware, the app automatically switches between modes:

**AI Mode**
- Uses the Gemini Nano model locally through `window.chrome.ai.prompt()`  
- No cloud requests required  
- Verifies reflections using local on-device reasoning  

**Demo Mode**
- Fallback logic for AI idea generation (random kindness ideas)  
- Simple keyword-based reflection verification  
- Optional “Manual Approve” button for smooth demonstration  
- Perfect for environments without the hardware requirement  
- Ensures the app works anywhere while remaining future-ready for true on-device AI execution  

---

## 🧭 How to Run
1. Clone the repository
2. Install dependencies
        **npm install**
3. Start the development server
        **npm start**
4. Open your browser
        http://localhost:3000

## What I Learned
-How to integrate experimental browser APIs (like window.chrome.ai) safely
-Designing graceful fallbacks when hardware or features aren’t available
-State management and persistence in React
-Presenting technical limitations clearly and honestly

## Future Improvements
-Add server-side logging to collect anonymized kindness trends
-Integrate IoT or hardware-based signals for task verification
-Expand reflection verification using contextual AI evaluation
-Deploy publicly (e.g., Vercel) for open demo access
-Add level-based progress, streaks, and visual rewards

## Vision & Reflection

I worked on this project on a computer without enough VRAM to fully utilize the Gemini Nano model — but I still explored and implemented its API logic to understand how on-device AI can enable local creativity.

Beyond the tech, I believe this concept is needed in today’s world — where disconnection and negativity are common.
Gamifying kindness and reflection can help people feel more joy, empathy, and self-worth.

In the future, with proper graphics, reward levels, and a more advanced AI backend, The Kindness Project could become a personalized kindness journey — connecting daily reflections, emotions, and AI-generated ideas to help users make small, meaningful changes that collectively make a big difference.

Even with current hardware limits, this is a project about learning, empathy, and possibility — a small step toward making kindness interactive and universal. 💫

## Author
Ekta Elizabeth Benoy
"Even though hardware limited me a little, I tried to completely utilise all the sources I have and tried to apply the concepts ihave learnt.And this project is a small prototype of an idea that can make changes in the world for the good.And I truly believe that in the hands of a person with enough resources and an open mind this idea can grow into something that spreads kindness and brings connection and hope into the world"

🪄 Submission Note

This project demonstrates working knowledge of the Chrome on-device AI API (window.chrome.ai.prompt()) and is designed for environments without current Gemini Nano hardware.
The app logic is fully compatible with Gemini Nano once the feature becomes broadly available.