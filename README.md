# UPI Offline Mesh — Offline Payment System

A full-stack application exploring offline payment communication using a mesh network architecture.

## Overview

UPI Offline Mesh is a project designed to explore how payment-related messages can be exchanged between nearby devices when internet connectivity is unavailable.

The system demonstrates a client-server architecture with a Spring Boot backend and a React-based frontend.

## Tech Stack

- **Backend:** Java, Spring Boot, Maven
- **Frontend:** React, JavaScript, Vite
- **Database:** H2 Database
- **Communication:** REST APIs
- **Development Tools:** IntelliJ IDEA, Git, GitHub

## Features

- Offline payment message handling
- Device-to-device communication simulation
- Payment transaction interface
- Backend API integration
- Transaction monitoring dashboard

*Only retain features that are actually implemented in your version.*

## Project Structure

```text
UPI_Without_Internet/
├── frontend/
│   ├── src/
│   └── package.json
├── src/
│   └── main/
│       ├── java/
│       └── resources/
├── pom.xml
└── README.md
```

## Getting Started

### Backend

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Learning Outcomes

- Working with REST APIs
- Integrating React with Spring Boot
- Managing application state
- Understanding offline communication concepts
- Using Git and GitHub for version control

## Author

**CodeRish11**

GitHub: https://github.com/CodeRish11

## Acknowledgment

This project includes work developed from an existing project. The current version contains additional implementation and modifications. Original work and applicable license requirements are acknowledged.
