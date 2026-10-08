# Tic-Tac-Toe AI

## CodSoft Artificial Intelligence Internship - Task 2

A web-based Tic-Tac-Toe game where a human player competes against an AI opponent. The AI uses the Minimax algorithm to evaluate possible game states and select the optimal move.

## Objective

The objective of this project is to build an AI agent that can play Tic-Tac-Toe against a human player using a decision-making algorithm.

## Features

- Human vs AI gameplay
- Minimax-based AI
- Optimal move selection
- Automatic win detection
- Draw detection
- Winning combination highlighting
- Restart game functionality
- Responsive user interface

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Minimax Algorithm

## How the AI Works

The AI uses the Minimax algorithm to evaluate possible future moves.

The algorithm considers different game states and assigns scores:

- AI win: Positive score
- Human win: Negative score
- Draw: 0

The AI attempts to maximize its score while assuming that the human player will make the best possible move.

This allows the AI to make strategic decisions instead of selecting random moves.

## Game Flow

1. The human player plays as X.
2. The AI plays as O.
3. The human selects an empty cell.
4. The AI evaluates possible moves using Minimax.
5. The AI selects the best available move.
6. The game continues until a player wins or the board is full.
7. The winning combination is highlighted when applicable.

## Project Structure

```text
codsoft-task-2-tic-tac-toe-ai/
│
├── index.html
├── style.css
├── script.js
└── README.md
python -m http.server 8000
http://localhost:8000