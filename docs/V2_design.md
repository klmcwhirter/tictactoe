# tictactoe - V2 design

## Overview

The app architecture involves the following:

| Architectural Element | Link | Purpose|
| --- | --- | --- |
| docker compose | [compose.yml](../compose.yml) | Orchestrate Lifecycle |
| nginx | [ui/Containerfile](../ui/Containerfile) | Serve app |
| solidjs | [ui/](../ui/) | framework |
| tailwindcss | | style library |
| vite | | app build automation |

## SPA

| Class | Purpose |
| --- | --- |
| Toolbar | app header, game related actions |
| Board | playing surface |
| App | app composition |
| AppContext | game state, inter-component actions |

## Models

| Concept | Purpose |
| --- | --- |
| WAYS_TO_WIN | list of board cell combinations that constitute a winning game |
| GameModel | game state |
