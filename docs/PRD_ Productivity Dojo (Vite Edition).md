

---

# **PRD: Productivity Dojo (Vite Edition)**

**Version:** 1.1

**Status:** Active Draft

**Lead Developer:** Senior Full-Stack Lead

## **1\. Product Vision**

A high-speed, responsive productivity hub where users "train" their focus. By treating tasks as "Katas" and time as a resource, users earn points and climb ranks, transforming a standard to-do list into a disciplined practice.

## **2\. Updated Tech Stack**

* **Frontend:** Vite \+ React (SPA).  
* **Styling:** Tailwind CSS (Mobile-first, responsive grid).  
* **State Management:** Zustand (Lightweight, ideal for Vite).  
* **Database/Auth:** Supabase (Real-time task updates and easy Auth).  
* **Icons/UI:** Lucide-React (Minimalist, sharp icons).

---

## **3\. Functional Requirements**

### **3.1 Gamified User Profile**

The profile is no longer just a settings page; it is the user's "Dojo Identity."

* **Identity:** Avatar, Username, Full Name, Email.  
* **Rank (Belt System):** A visual badge representing user progress.  
  * *Example:* White Belt (0-100 pts) $\\rightarrow$ Yellow $\\rightarrow$ Green $\\rightarrow$ Brown $\\rightarrow$ Black Belt (Master).  
* **Points (XP):** A numerical value updated in real-time upon task completion.

### **3.2 Task Management (The Training Log)**

* **Daily View:** Focused list of tasks for the current 24-hour cycle.  
* **Upcoming View:** Planning area for future "Katas."  
* **Task Parameters:**  
  * **Priority:** 1 (Low) to 3 (High).  
  * **Time Block:** Specific start\_time and end\_time.  
  * **Countdown:** A visual indicator showing time remaining for the active task.

---

## **4\. Gamification Logic (The Scoring Engine)**

To maintain balance, points are calculated based on the complexity (Priority) and the discipline (meeting the deadline).

### **4.1 Points Formula**

The points ($XP$) earned for a task is calculated as:

$$XP \= (P \\times 10\) \+ \\left( \\frac{T\_{allocated}}{10} \\right)$$

* Where $P$ is the Priority level (1-3).  
* $T\_{allocated}$ is the time set in minutes.  
* **Penalty:** If a task is marked "Failed" or missed, the user earns **0 XP** (but does not lose points, to encourage a growth mindset).

### **4.2 Ranking Tiers**

| Points (XP) | Rank Title | Visual Indicator |
| ----: | ----: | ----: |
| 0 \- 500 | Initiate | White Belt |
| 501 \- 1500 | Disciple | Blue Belt |
| 1501 \- 5000 | Warrior | Brown Belt |
| 5000+ | Sensei | Black Belt |

---

## **5\. Non-Functional Requirements**

* **Speed:** Vite’s HMR (Hot Module Replacement) must be leveraged for a \< 1s initial load time.  
* **Responsiveness:** \* **Desktop:** Sidebar navigation with a wide timeline view.  
  * **Mobile:** Bottom navigation bar with a focused "Single Task" card view.  
* **Persistence:** Use localStorage to cache task states so the app feels instant even on slow connections.

---

## **6\. Development Roadmap (Phase 1\)**

1. **Sprint 1:** Setup Vite \+ Tailwind \+ Supabase Auth.  
2. **Sprint 2:** CRUD operations for Tasks (Start/End time logic).  
3. **Sprint 3:** Gamification Engine (Logic to calculate XP and Rank).  
4. **Sprint 4:** Responsive Polish & Profile Dashboard.

---

## **7\. Strategic Questions for You**

To finalize the logic for the "Points" and "Vite" implementation:

1. **Live Updates:** Since we are using Vite/React, would you like a **Live Timer** on the screen that counts down the current task?  
2. **Point Decay:** Should users lose points if they are inactive for many days (to simulate "losing your edge")?  
3. **Manual vs. Auto:** Should a task mark itself as "Complete" when the end time is reached, or must the user manually "Finish" the task to get points?  
4. **Social:** Do you want a "Leaderboard" to see how other users in the Dojo are ranking?

