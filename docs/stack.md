This detailed stack configuration is optimized for the **Productivity Dojo (Cyber-Dojo Edition)**, focusing on the high-speed requirements of Vite and the neon-minimalist aesthetic.

## **The Cyber-Dojo Tech Stack (2026 Edition)**

| Layer | Technology | Why This Choice? |
| :---- | :---- | :---- |
| **Core** | **Vite \+ React 19** | Best-in-class HMR (Hot Module Replacement) and lean production bundles. |
| **Styling** | **Tailwind CSS \+ shadcn/ui** | shadcn provides "copy-paste" components you can customize with neon-glow CSS variables. |
| **Animations** | **Motion (Framer Motion)** | The de-facto standard for declarative, hardware-accelerated React animations in 2026\. |
| **State** | **Zustand** | Ultra-lightweight store that avoids the "re-render hell" of larger libraries. |
| **Backend** | **Supabase** | Provides real-time Postgres subscriptions for instant XP and task syncing. |
| **Persistence** | **PWA (Vite Plugin PWA)** | Enables offline "Training Logs" and "Install to Home Screen" capability. |

---

## **Best Libraries for Speed & Smoothness**

To achieve the "fast and smooth" goal, I recommend these specific additions to your workflow:

### **1\. UI & Aesthetics: shadcn/ui \+ framer-motion**

* **Why:** Instead of a heavy UI kit that slows down initial load, shadcn/ui gives you the raw code for accessible components (like Modals and Tabs).  
* **Performance Tip:** Use **Framer Motion's Layout prop** for "Magic Move" transitions. When a task moves from "Pending" to "Active," it will glide smoothly into place without manual CSS math.

### **2\. Micro-Interactions: @formkit/auto-animate**

* **The Problem:** Standard list reordering can feel "jumpy."  
* **The Solution:** This library provides zero-config transitions. Adding a single line to your task list container makes adding, removing, and reordering tasks buttery smooth with minimal bundle impact.

### **3\. Form Handling: React Hook Form \+ Zod**

* **Why:** Traditional React forms cause a re-render on every keystroke. React Hook Form uses "uncontrolled" components to keep the UI responsive even on low-end mobile devices.  
* **Dojo Use:** Perfect for the "Quick Task Entry" modal where users type their Kata titles.

### **4\. Date & Timer Logic: date-fns**

* **Why:** It is modular, meaning you only import the functions you need (e.g., formatDistanceToNow), keeping your bundle small compared to Moment.js.

---

## **Optimized Configuration File (package.json snippet)**

JSON

{  
  "dependencies": {  
    "@supabase/supabase-js": "^latest",  
    "zustand": "^latest",  
    "framer-motion": "^latest",  
    "@formkit/auto-animate": "^latest",  
    "lucide-react": "^latest",  
    "date-fns": "^latest",  
    "react-hook-form": "^latest",  
    "zod": "^latest",  
    "clsx": "^latest",  
    "tailwind-merge": "^latest"  
  },  
  "devDependencies": {  
    "vite-plugin-pwa": "^latest",  
    "tailwindcss-animate": "^latest"  
  }  
}

---

## **Implementation Advice for "Smoothness"**

### **1\. Optimistic UI Updates**

When a user "Strikes the Gong" (marks a task complete), use **Zustand** to update the XP and Rank *locally* first. This makes the app feel "instant" while Supabase syncs the data in the background.

### **2\. The "Focus Pulse" Timer**

To keep the countdown from slowing down your app, avoid putting the timer state in a global store that re-renders everything. Use a **local React reference (useRef)** or a dedicated high-frequency state slice to update only the timer text.

### **3\. Neon Glassmorphism CSS**

For that "Cyberpunk" look without performance hits, use standard CSS backdrop-filter: blur() and drop-shadow(0 0 8px var(--neon-color)).

Would you like me to **write the Zustand store logic** for the XP and Ranking system based on your points formula?

