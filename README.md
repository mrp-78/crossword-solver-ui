# 🧩 Persian Crossword Solver – Web Interface

This repository contains the **Next.js web interface** for the Persian crossword solver engine.  
It provides an interactive way to input crossword puzzles, run the NLP solver, and visualize solutions.

## Features
- Upload crossword descriptions and grid structure  
- Trigger the solver backend ([persian-crossword-solver](https://github.com/mrp-78/persian-crossword-solver))  
- Display the filled crossword grid with candidate solutions  
- Interactive editing and validation  

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/mrp-78/crossword-solver-ui.git
cd crossword-solver-ui
pnpm install
```

Run the development server:

```bash 
pnpm dev
```

Open http://localhost:3000 in your browser.

## Project Structure

`pages/` – Next.js pages (entry points)

`components/` – React UI components for crossword grid and interface

`api/` – API routes and connectors to solver backend

## Related Repositories

[persian-crossword-solver](https://github.com/mrp-78/persian-crossword-solver) – core NLP solver engine
