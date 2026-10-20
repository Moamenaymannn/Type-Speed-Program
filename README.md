# ⌨️ Type Speed Program

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.7.18-brightgreen.svg?logo=springboot)](https://spring.io/projects/spring-boot)
[![Angular](https://img.shields.io/badge/Angular-13-dd0031.svg?logo=angular)](https://angular.io/)
[![Java](https://img.shields.io/badge/Java-8%20%7C%2017%20%7C%2021-orange.svg?logo=openjdk)](https://openjdk.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg?logo=docker)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A full-stack, real-time **Typing Speed & Accuracy Web Application** built with **Java / Spring Boot** on the backend and **Angular** on the frontend. Engineered as a showcase portfolio project demonstrating clean 3-tier layered architecture, RESTful API design, responsive reactive UI, and containerized cloud deployment.

---

## 🌐 Live Demo & Portfolio Links

- **Live Application**: *[Deploy on Render](https://render.com) (See [Deployment Guide](#-free-cloud-deployment-guide) below)*
- **GitHub Repository**: [https://github.com/Moamenaymannn/Type-Speed-Program](https://github.com/Moamenaymannn/Type-Speed-Program)
- **Author**: **Moamen Ayman** (Junior Java Developer)

---

## ⚡ Key Features

- **Real-Time WPM & Accuracy**: Live calculation during active typing based on standard typing metrics `((characters / 5) / elapsedMinutes)`.
- **Per-Character Color Coding**: Immediate visual feedback (green = correct, red = error, underline cursor = active character).
- **Dual Completion Triggers**: Ends smoothly when the 60-second countdown reaches 0 or when the passage is fully typed.
- **3 Difficulty Tiers**: Easy (~20–40 WPM), Medium (~40–70 WPM), and Hard (70+ WPM with complex syntax & vocabulary).
- **Personalized Performance Feedback**: Custom tips based on accuracy and speed thresholds with visual rank medals (🏆, 🥈, 🥉).
- **Global Leaderboard**: Displays the top 10 historical scores persisted via Spring Data JPA.
- **Fail-Safe Offline Mode**: Client session fallback retains scores even if backend connection encounters network drops.
- **Cloud & Docker Ready**: Multi-stage Docker containerization for 1-click free hosting on Render, Railway, or Fly.io.

---

## 🏗️ Architecture

```
                    ┌─────────────────────────────────┐
                    │       Angular 13 SPA (UI)       │
                    │  (Home | Test | Results | Board)│
                    └────────────────┬────────────────┘
                                     │  REST API (JSON)
                                     ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Spring Boot REST Backend                      │
│                                                                     │
│  Controllers:   TextSnippetController  |  TypingResultController    │
│                            │                          │             │
│  Services:      TextSnippetService     |  TypingResultService       │
│                            │                          │             │
│  Repositories:  TextSnippetRepository  |  TypingResultRepository    │
└────────────────────────────────────┬────────────────────────────────┘
                                     │  Spring Data JPA / Hibernate
                                     ▼
                    ┌─────────────────────────────────┐
                    │      H2 In-Memory Database      │
                    │   (text_snippet, typing_result) │
                    └─────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology | Details |
|---|---|---|
| **Backend** | Java 8 / 17+, Spring Boot 2.7.18 | Spring Web, Spring Data JPA, Hibernate, Maven |
| **Frontend** | Angular 13, TypeScript, RxJS | Two-way binding, Reactive Forms, CSS Custom Properties |
| **Database** | H2 In-Memory Database | Seeded with 10 curated snippets via `data.sql` |
| **DevOps** | Docker, Docker Compose, Render | Multi-stage build (Node 18 -> Maven -> Eclipse-Temurin JRE) |

---


## 💻 Local Development Setup

### Prerequisites
- Java JDK 8, 17, or 21
- Maven 3.6+
- Node.js 16+ & npm 8+

### 1. Run the Backend
```bash
cd backend
mvn spring-boot:run
```
- API will start on: **http://localhost:8080**
- H2 Database Console: **http://localhost:8080/h2-console**
  - JDBC URL: `jdbc:h2:mem:typespeeddb`
  - Username: `sa` | Password: *(leave blank)*

### 2. Run the Frontend
```bash
cd frontend
npm install
npx ng serve
```
- Open your browser at: **http://localhost:4200**

### 3. Run with Docker Compose (Local Unified Container)
```bash
docker compose up --build
```
- Open: **http://localhost:8080**

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/snippets` | Retrieve all text snippets |
| `GET` | `/api/snippets/random` | Retrieve a random snippet |
| `GET` | `/api/snippets/random/by-difficulty?difficulty=EASY` | Retrieve snippet filtered by difficulty (`EASY`, `MEDIUM`, `HARD`) |
| `POST` | `/api/results` | Save a new typing test score |
| `GET` | `/api/results/leaderboard` | Retrieve top 10 scores sorted by WPM |
| `GET` | `/api/results?playerName=John` | Filter scores by player name (case-insensitive) |

---

## 👤 Author

**Moamen Ayman**
- **GitHub**: [@Moamenaymannn](https://github.com/Moamenaymannn)
- **Role**: Junior Java Developer
