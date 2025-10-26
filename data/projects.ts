export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  category: string
  date: string
  technologies: string[]
  github?: string
  demo?: string
  report?: string
  featured: boolean
  images?: string[]
  challenges?: string[]
  solutions?: string[]
  outcomes?: string[]
  teamSize?: number
  duration?: string
}

export const projects: Project[] = [
  {
    slug: "portfolio-website",
    title: "Personal Portfolio & Cybersecurity Showcase",
    description: "Modern portfolio website built with Next.js 14, showcasing cybersecurity projects, skills, and achievements with dynamic routing and static generation.",
    longDescription: `
A comprehensive personal portfolio website designed to showcase my cybersecurity expertise, academic projects, certifications, and professional journey. Built with cutting-edge web technologies for optimal performance and user experience.

## 🎯 Project Goals

• Create a professional online presence highlighting cybersecurity skills
• Showcase academic projects with detailed explanations
• Display certifications and achievements from platforms like TryHackMe
• Provide an interactive and responsive user experience
• Optimize for performance and SEO
• Deploy on GitHub Pages with automated CI/CD

## 🛠️ Technology Stack

• **Next.js 14** - App Router for modern React architecture
• **TypeScript** - Type safety and better developer experience
• **Tailwind CSS** - Utility-first, responsive design
• **Framer Motion** - Smooth, engaging user interactions
• **Lucide React** - Consistent, modern iconography
• **GitHub Actions** - Automated CI/CD workflow
• **EmailJS** - Contact form functionality without backend

## ✨ Key Features

• **Dynamic Project Pages** - Each project has detailed page with full descriptions
• **Bilingual CV Support** - Toggle between French and English resume versions
• **TryHackMe Integration** - Display real-time stats and achievements
• **CTF Writeups Section** - Showcase penetration testing writeups
• **Skills Visualization** - Interactive display of technical skills
• **Certifications Gallery** - Professional certifications with verification links
• **Responsive Design** - Fully responsive across all devices
• **Dark Theme** - Cybersecurity-themed dark color scheme
• **Contact Form** - Functional email integration
• **SEO Optimized** - Proper meta tags and static generation

## 🏗️ Architecture

The website uses Next.js 14's App Router with static site generation (SSG) for optimal performance. All pages are pre-rendered at build time and served as static HTML, ensuring fast load times and excellent SEO.

**Project Structure:**
• Component-based architecture with reusable modules
• Dynamic routing for individual project pages
• Centralized data management in TypeScript files
• Lazy loading for better performance
• Markdown support for rich text formatting

## 🚀 Development Process

**1. Planning** - Designed site architecture and user flow
**2. Design** - Created cybersecurity-themed dark design
**3. Implementation** - Built components incrementally with TypeScript
**4. Content** - Populated with real projects and achievements
**5. Optimization** - Lazy loading, image optimization, code splitting
**6. Testing** - Cross-browser and device testing
**7. Deployment** - Set up CI/CD pipeline with GitHub Actions

## 📦 Deployment & CI/CD

Automated deployment using GitHub Actions:
• Automatic builds on push to main branch
• Static site generation with Next.js export
• Deployment to GitHub Pages
• Build verification and error checking
• Ready for custom domain configuration
    `,
    category: "Web Development",
    date: "2025-2026",
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub Actions", "React"],
    github: "https://github.com/AyGoub/AyGoub.github.io",
    demo: "https://aygoub.github.io",
    featured: false,
    images: [],
    challenges: [
      "Configuring Next.js for static export compatible with GitHub Pages",
      "Implementing dynamic routes while maintaining static generation",
      "Creating smooth animations without impacting performance",
      "Managing bilingual content (French/English) for CV section",
      "Integrating external data (TryHackMe stats) in a static site"
    ],
    solutions: [
      "Used Next.js 'output: export' with proper configuration for GitHub Pages deployment",
      "Implemented generateStaticParams for pre-rendering all project routes",
      "Optimized Framer Motion animations with useReducedMotion and lazy loading",
      "Created dynamic language switcher with useState for client-side switching",
      "Designed fallback UI for external data with graceful degradation"
    ],
    outcomes: [
      "Successfully deployed live portfolio at aygoub.github.io",
      "Achieved 100/100 Lighthouse performance score for static pages",
      "Created fully responsive design working on all screen sizes",
      "Implemented automated deployment reducing manual work",
      "Built scalable architecture for easy content updates",
      "Showcased full-stack development and DevOps skills"
    ],
    teamSize: 1,
    duration: "Ongoing (2024-2025)"
  },
  {
    slug: "keylogger",
    title: "Python KeyLogger",
    description: "Educational keylogger implementation in Python demonstrating keystroke capture, logging mechanisms, and security awareness for cybersecurity research.",
    longDescription: `
An educational keylogger developed in Python to understand keystroke monitoring techniques, system-level interactions, and security implications. This project was created for **cybersecurity research and educational purposes only**.

## 🎯 Project Overview

This project demonstrates how keyloggers work at a technical level, providing insights into system security vulnerabilities and defensive measures. It showcases low-level system programming, event handling, and secure coding practices.

## 📚 Educational Objectives

• Understand keystroke capture mechanisms at the OS level
• Learn about system-level programming and event hooks
• Explore security implications of keylogging malware
• Develop defensive strategies against such attacks
• Practice responsible disclosure and ethical hacking principles

## 🔧 Technical Implementation

**Core Features:**

• **Keystroke Capture** - Real-time monitoring of keyboard events
• **Event Logging** - Secure storage of captured data
• **System Hooks** - Integration with OS-level keyboard APIs
• **Stealth Operation** - Understanding detection avoidance techniques
• **Data Export** - Structured logging formats for analysis

**Architecture:**

The keylogger uses Python libraries to interface with system-level keyboard events:
• Event listeners for capturing keystrokes
• Buffer management for efficient data handling
• File I/O operations for secure logging
• Error handling and crash recovery

## 🛡️ Security Considerations

This project emphasizes understanding attack vectors to build better defenses:

• **Awareness** - Understanding how keyloggers operate
• **Detection** - Learning methods to identify keylogging software
• **Prevention** - Implementing security measures against monitoring
• **Ethics** - Emphasizing responsible use and legal implications

## 🔍 Defensive Insights

Through developing this project, I gained valuable knowledge about:

• How to detect keyloggers on systems
• Security best practices for protection against monitoring
• The importance of endpoint security solutions
• Behavioral patterns that indicate keylogger presence

## ⚠️ Legal & Ethical Notice

**IMPORTANT:** This project is for educational and research purposes only. Unauthorized use of keyloggers is illegal in most jurisdictions. The project was developed in a controlled environment to understand security vulnerabilities and improve defensive measures.

## 📖 Learning Outcomes

• Gained deep understanding of OS-level event handling
• Learned system programming concepts in Python
• Developed appreciation for endpoint security measures
• Enhanced knowledge of malware analysis and detection
• Understood the ethical responsibilities in cybersecurity
    `,
    category: "Cybersecurity",
    date: "2025",
    technologies: ["Python", "pynput", "System APIs", "Event Handling", "Security Research"],
    github: "https://github.com/AyGoub/KeyLogger",
    demo: "",
    featured: true,
    images: [],
    challenges: [
      "Understanding low-level system event handling and keyboard APIs",
      "Implementing reliable keystroke capture across different OS environments",
      "Ensuring responsible and ethical development practices",
      "Balancing functionality with security awareness education"
    ],
    solutions: [
      "Used pynput library for cross-platform keyboard event monitoring",
      "Implemented robust error handling and logging mechanisms",
      "Created comprehensive documentation emphasizing ethical use",
      "Developed in isolated virtual environment for safe testing"
    ],
    outcomes: [
      "Successfully demonstrated keystroke capture mechanisms",
      "Enhanced understanding of system-level security vulnerabilities",
      "Developed defensive mindset for endpoint security",
      "Created educational resource for cybersecurity awareness",
      "Gained practical experience with Python system programming"
    ],
    teamSize: 1,
    duration: "Completed"
  },
  {
    slug: "grand-prix-f1",
    title: "Grand Prix F1 Racing",
    description: "Intelligent F1 racing bot using A* pathfinding algorithm in C for autonomous navigation, collision avoidance, and optimal race strategy in real-time competitions.",
    longDescription: `
An intelligent Formula 1 racing bot developed in C for a programming competition. The system uses advanced pathfinding algorithms to autonomously navigate race circuits, avoid collisions with opponents, manage fuel consumption, and optimize racing strategies in real-time.

## 🎯 Project Overview

This project implements a competitive F1 racing AI using the A* pathfinding algorithm with custom heuristics for a programming competition. The bot competes against other AI drivers on various circuits, making real-time decisions about acceleration, braking, overtaking, and fuel management to achieve the fastest lap times.

**Main Objectives:**

• **Reach the finish line as quickly as possible** - Minimize circuit completion time by combining speed efficiency with strategic racing decisions
• **Respect race regulations** - Adhere to maximum speed limits, fuel consumption rules, and acceleration constraints imposed by race regulations
• **Optimal movement algorithm design** - Develop an algorithm ensuring the shortest possible path while considering circuit elements and race rules
• **Multi-circuit validation** - Test performance across different circuits to measure arrival times and manage fuel consumption
• **Code optimization** - Improve performance by optimizing source code to increase algorithm efficiency, reduce computation time, and improve race times

## 🏎️ Core Features

• **A* Pathfinding Algorithm** - Custom implementation for optimal route finding on race circuits
• **Real-time Decision Making** - Calculates acceleration vectors every turn (sub-second response)
• **Collision Avoidance** - Detects and avoids obstacles and opponent vehicles using line traversal
• **Fuel Management** - Optimizes speed vs. fuel consumption for race completion
• **Terrain Adaptation** - Handles different surface types (track, sand, obstacles)
• **Multi-opponent Racing** - Tracks and responds to up to 2 other AI drivers simultaneously
• **Boost Strategy** - Strategic use of limited turbo boosts (5 per race)

## 💻 Technical Implementation

**Core Algorithms:**

• **A* Search** - Modified A* with Chebyshev heuristic for optimal pathfinding
• **Collision Detection** - Bresenham line algorithm for path clearance checking
• **Hash Table** - Custom hash table (capacity 1000) for closed set optimization
• **Priority Queue** - Min-heap queue for efficient node exploration
• **Destination Selection** - Euclidean distance-based target prioritization

**Data Structures:**

• **GraphNode** - Position, velocity, fuel, cost, heuristic, predecessor chain
• **TerrainMap** - 2D grid representation of the circuit
• **GraphQueue** - Priority queue sorted by totalCost (cost + heuristic)
• **HashTable** - Fast lookup for visited nodes with custom hash function
• **DestinationList** - Ordered list of finish line positions

**System Architecture:**

• Modular design with 9 separate C modules
• Graph-based representation of race positions
• State space search through position-velocity combinations
• Memory-efficient node management with proper cleanup
• Round-based execution with time tracking (sub-second per turn)

## 🧮 Algorithm Details

**A* Implementation:**
• State space: (x, y, vx, vy) - position and velocity vectors
• Heuristic: Chebyshev distance (max of dx, dy) to finish line
• Cost function: Path length + fuel consumption penalty
• Successor generation: 9 acceleration options (-1, 0, +1 for x and y)
• Speed constraint: Maximum velocity magnitude of 25 units
• Fuel calculation: Based on acceleration magnitude and current speed

**Collision Detection:**
• Line traversal from current to next position
• Checks each discrete point along the path
• Detects walls (.), obstacles, sand (~), and opponent positions
• Avoids positions occupied by other vehicles

**Optimization Techniques:**
• Hash-based closed set prevents revisiting states
• Priority queue ensures optimal node exploration order
• Path caching and reuse when possible
• Sand terrain penalty (extra fuel cost + speed limit)
• Dynamic speed adjustment based on remaining fuel

## 🏁 Race Features

**Strategic Elements:**
• Optimal acceleration calculation from current state
• Overtaking maneuvers when opponents block path
• Fuel-efficient pathing when low on gas
• Speed adaptation for terrain types
• Emergency braking for obstacle avoidance

**Competition Format:**
• Real-time stdin/stdout communication with race manager
• Position updates every round
• Gas consumption tracking
• Boost usage optimization
• Performance timing per round

## 📊 Performance Metrics

• **Response Time** - Calculates moves in under 1 second per turn
• **Fuel Efficiency** - Optimizes path length vs. acceleration costs
• **Pathfinding Accuracy** - Successfully navigates complex circuits
• **Collision Avoidance** - Zero crashes in optimal conditions
• **Memory Management** - Proper allocation/deallocation with no leaks

## 🛠️ Build System

• Makefile-based compilation
• Modular compilation of 9 source files
• Compiler flags: -Wall -std=c99 -Wextra -O3
• Math library linking (-lm)
• Binary output to drivers directory

## 📚 Learning Outcomes

• Mastered A* pathfinding algorithm implementation from scratch
• Implemented advanced graph search data structures (priority queue, hash table)
• Applied algorithmic optimization techniques for real-time constraints
• Gained experience with competitive programming and AI decision-making
• Developed robust collision detection using computational geometry
• Enhanced understanding of state space search and heuristic design
• Practiced efficient C programming with manual memory management
    `,
    category: "Algorithms ",
    date: "2024",
    technologies: ["C", "A* Algorithm", "Pathfinding", "Data Structures", "Graph Search", "Hash Tables"],
    github: "https://github.com/AyGoub/Grand_Prix-F1",
    demo: "",
    report: "/reports/grand-prix-f1-report.pdf",
    featured: false,
    images: [
      "/projects/grand-prix-f1-1.png",
      "/projects/grand-prix-f1-2.png"
    ],
    challenges: [
      "Initial node allocation causing memory crashes on large maps due to pre-allocating all nodes in a 2D array",
      "Computation time constraints: linked list for open set was too slow to find minimum cost node within 1-second deadline",
      "Collision detection between pilots: identifying when vehicles occupy same position or pass through walls ('teleporting')",
      "Selecting optimal heuristic: poor heuristic choice led to suboptimal paths and excessive computation time",
      "Fuel management on difficult terrain: mandatory sand sections made race completion impossible via normal route"
    ],
    solutions: [
      "Selective node allocation: only allocate memory for nodes when added to open list with competitive f-cost, drastically reducing memory usage",
      "Priority queue for open list: replaced linked list with min-heap queue for O(log n) operations, meeting time constraints even on large maps",
      "Hash table for closed list (capacity 1000): replaced linked list with hash table for O(1) lookup to verify visited nodes",
      "Implemented collisionDetection() using line sweep algorithm and reachableNode() to validate safe, obstacle-free paths",
      "Chebyshev heuristic: measures max absolute difference between coordinates, treats diagonal movement equal to horizontal/vertical, optimizing corner handling",
      "Sand avoidance weighting: assigned higher cost to sand terrain in pathfinding to favor normal roads and reduce fuel consumption"
    ],
    outcomes: [
      "Successfully completed races on various circuit layouts with zero memory crashes",
      "Achieved optimal pathfinding with sub-second response times (<1s per turn)",
      "Implemented robust collision avoidance with 3-vehicle tracking and wall penetration prevention",
      "Reduced computation time significantly through priority queue and hash table optimizations",
      "Optimized fuel efficiency by intelligently avoiding sand sections while respecting race constraints",
      "Demonstrated strong algorithm design, data structure optimization, and problem-solving skills"
    ],
    teamSize: 3,
    duration: "3 months"
  },
  {
    slug: "epidemic-simulation",
    title: "Epidemic Simulation System",
    description: "Multi-threaded epidemic simulation system built in C implementing SIR model for disease propagation analysis with real-time visualization and statistical tracking.",
    longDescription: `
A comprehensive epidemic simulation system developed in C as part of an Operating Systems course. The project simulates disease propagation using the SIR (Susceptible-Infected-Recovered) epidemiological model with multi-threading, process synchronization, and real-time data visualization.

## 🎯 Project Overview

This project demonstrates advanced operating system concepts including process management, inter-process communication, thread synchronization, and resource management. The simulation models how diseases spread through populations with configurable parameters for transmission rates, recovery times, and population dynamics.

**Team:** Developed collaboratively by a team of 4 members
**Achievement:** Ranked among the top 3 best projects in the entire promotion

## 👥 Team Responsibilities

Our team divided the work across different system components:

• **Simulation Engine** - Core logic and epidemic propagation model
• **Multi-threading** - Thread management and synchronization mechanisms  
• **Data Analysis** - Statistical collection and analysis
• **Visualization** - Graphical interface and real-time plotting

## 🔧 Technical Architecture

**Core Components:**

• Multi-threaded epidemic propagation model
• SIR Model mathematical implementation
• Concurrent execution of population agents
• Mutex-based synchronization for shared resources
• Real-time graphical visualization
• Statistical tracking and data analysis

**Operating Systems Concepts:**

• **Multi-threading** - Each population agent runs in a separate thread
• **Process Synchronization** - Critical sections protected with mutexes
• **Shared Memory** - Efficient data sharing between threads
• **Resource Management** - Proper allocation and deallocation
• **Deadlock Prevention** - Careful synchronization design
• **Race Condition Handling** - Thread-safe operations

## 🦠 SIR Epidemiological Model

The simulation implements the classic SIR model:

• **Susceptible (S)** - Individuals who can contract the disease
• **Infected (I)** - Currently infected and contagious individuals  
• **Recovered (R)** - Individuals with immunity after recovery

## ⚙️ Configurable Parameters

• Population size and density
• Transmission rate (beta)
• Recovery rate (gamma)
• Initial number of infected individuals
• Movement patterns and contact rates
• Simulation duration and time steps

## 📊 Real-time Monitoring

• Live epidemic curve visualization
• Population state transitions tracking
• Peak infection time and magnitude
• Reproduction number (R0) calculation
• Comprehensive statistical analysis

## 💻 Implementation

**Technologies:**
• C Language for high-performance system programming
• POSIX Threads (pthread) for multi-threading
• Mutexes and condition variables for synchronization
• Dynamic memory management
• Graphics library for real-time visualization

**Performance Optimizations:**
• Minimized critical section duration
• Efficient thread scheduling
• Optimized data structures
• Reduced context switching overhead

## 📚 Learning Outcomes

• Mastered concurrent programming and thread management
• Applied synchronization mechanisms in practice
• Gained deep understanding of OS resource management
• Developed performance tuning skills
• Enhanced team collaboration abilities
• Created large-scale system design

## 🌍 Real-world Applications

• Public health planning and epidemic preparedness
• Policy evaluation for disease control measures
• Understanding pandemic dynamics
• Educational demonstrations
• Testing intervention strategies
    `,
    category: "System Programming",
    date: "2024/2025",
    technologies: ["C", "POSIX Threads", "Multi-threading", "Synchronization", "SIR Model", "Systems Programming"],
    github: "https://github.com/AyGoub/epidemic_project_os",
    demo: "",
    report: "/reports/epidemic-simulation-report.pdf",
    featured: true,
    images: [
      "/projects/epidemic-simulation-1.png",
      "/projects/epidemic-simulation-2.png",
      "/projects/epidemic-simulation-3.png"
    ],
    challenges: [
      "Managing concurrent access to shared population data structures",
      "Preventing race conditions in multi-threaded environment",
      "Optimizing performance with large population sizes",
      "Coordinating work across 4 team members with different components",
      "Ensuring accurate SIR model implementation with thread synchronization"
    ],
    solutions: [
      "Implemented robust mutex locking strategy for critical sections",
      "Used thread-safe data structures and atomic operations where possible",
      "Profiled and optimized bottlenecks in simulation loop",
      "Established clear module interfaces and regular team integration meetings",
      "Validated simulation results against known epidemic models"
    ],
    outcomes: [
      "Successfully simulated epidemic propagation with up to 10,000+ agents",
      "Achieved accurate SIR model behavior validated against theoretical results",
      "Demonstrated solid understanding of OS concurrency concepts",
      "Completed collaborative project with excellent team coordination",
      "Ranked among the top 3 best projects in the entire promotion",
      "Project defended successfully with high marks",
      "Gained practical experience with system-level C programming"
    ],
    teamSize: 4,
    duration: "4 months"
  }
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug)
}
