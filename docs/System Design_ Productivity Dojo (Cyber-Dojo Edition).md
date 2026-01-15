# **System Design: Productivity Dojo (Cyber-Dojo Edition)**

**Version: 1.0**

**Theme: Neon-Minimalist / Cyberpunk / Gen-Z Aesthetic**

**Core Philosophy: High-speed focus training through gamified task-discipline.**

---

## **1\. Visual & Interaction Identity**

**To achieve the "Vibrant Gen-Z Cyberpunk" feel, the UI will utilize a "Glassmorphism" approach with neon accents.**

* **Color Palette:**  
  * **Background: \#0A0A0C (Deep Obsidian).**  
  * **Primary: \#00FFA3 (Cyber Green/Neon Mint) \- For "Success" and "Initiate" states.**  
  * **Secondary: \#BC13FE (Electric Purple) \- For "XP" and "Sensei" states.**  
  * **Accent: \#FF0055 (Radical Red) \- For timers and "High Priority" tasks.**  
* **Aesthetics: \* Glow Effects: CSS drop-shadow and box-shadow with neon hex codes for active tasks and high-rank badges.**  
  * **Animations: Framer Motion for layout transitions (Spring physics) and "Glitch" entry effects for leveling up.**  
  * **Typography: Space Grotesk (Modern/Tech) paired with a monospaced font (JetBrains Mono) for timers and XP values.**

---

## **2\. Architecture Overview**

**The system follows a Serverless SPA architecture optimized for Vite’s speed and Supabase’s real-time capabilities.**

### **2.1 Frontend Layer (Vite \+ React)**

* **State Management (Zustand): \* useTaskStore: Handles local CRUD, optimistic UI updates, and the countdown timer logic.**  
  * **useUserStore: Manages XP, Rank calculations, and Profile data.**  
* **Logic Engine (The Scoring Hub): A dedicated utility that calculates $XP$ using the formula $(P \\times 10\) \+ (T\_{allocated} / 10)$ whenever a task status changes to COMPLETED.**

### **2.2 Backend Layer (Supabase)**

* **PostgreSQL: Stores user profiles and task history.**  
* **Real-time: Listens for task updates to sync XP across multiple devices (e.g., finishing a task on mobile updates the desktop "Sensei" rank instantly).**  
* **Edge Functions (Optional): To handle "Point Decay" logic (running a daily cron job to check inactivity).**

---

## **3\. Database Schema**

| Table | Column | Type | Description |
| ----: | ----: | ----: | ----: |
| **profiles** | **id** | **UUID (FK)** | **References Supabase Auth.** |
|  | **username** | **Text** | **Unique Dojo handle.** |
|  | **xp** | **Integer** | **Total accumulated experience points.** |
|  | **rank\_id** | **Enum** | **Initiate, Disciple, Warrior, Sensei.** |
| **tasks** | **id** | **UUID** | **Primary Key.** |
|  | **user\_id** | **UUID (FK)** | **Owner of the task.** |
|  | **title** | **Text** | **Name of the "Kata."** |
|  | **priority** | **Int (1-3)** | **Difficulty multiplier.** |
|  | **start\_time** | **Timestamp** | **Scheduled start.** |
|  | **end\_time** | **Timestamp** | **Scheduled end.** |
|  | **status** | **Enum** | **pending, active, completed, failed.** |

---

## **4\. Component & Animation Strategy**

### **4.1 The "Active Kata" Card (Mobile/Desktop)**

**The centerpiece of the UI.**

* **The Glow: A motion.div that pulses with a color corresponding to the task priority (Green for 1, Purple for 2, Red for 3).**  
* **Cyberpunk Timer: A high-refresh countdown that turns "Glitchy" (using a CSS shake animation) when the last 60 seconds are reached.**  
* **Interaction: Swipe-to-complete (Mobile) or "Focus Mode" (Desktop) which hides the sidebar to minimize distractions.**

### **4.2 The Rank Progression (Belt System)**

* **Visuals: Instead of static images, use SVG badges with feGaussianBlur filters to create a neon aura.**  
* **Level Up Event: When a user crosses a threshold (e.g., 501 XP), trigger a full-screen "System Override" animation—briefly flashing the new rank in neon text with a sound effect.**

---

## **5\. Technical Implementation Details**

### **5.1 Real-Time Countdown Logic**

**To ensure high performance without draining battery:**

* **Use a single setInterval inside a custom hook (useDojoTimer) that updates the Zustand store once per second.**  
* **Format the $T\_{remaining}$ string using a lightweight utility rather than heavy date libraries.**

### **5.2 "Speed" Optimization**

* **Vite HMR: Configured to keep the state of the timer even during development hot-reloads.**  
* **PWA: Service workers to allow "Offline Training," syncing tasks to Supabase once the connection is restored.**

---

## **6\. Strategic Feature Roadmap**

| Feature | Cyberpunk Spin | Implementation |
| ----: | ----: | ----: |
| **Live Timer** | **"The Focus Pulse"** | **React state \+ CSS animate-pulse tied to the heartbeat of the timer.** |
| **Manual Finish** | **"Strike the Gong"** | **User must click a "Finish Kata" button to claim XP; adds friction for intentionality.** |
| **Point Decay** | **"Edge Maintenance"** | **If last\_active \> 48 hours, subtract 5 XP daily via Supabase Cron.** |
| **Leaderboard** | **"The Dojo Ranks"** | **A neon-lit table showing the top 10 "Senseis" in the ecosystem.** |

---

**\\**

