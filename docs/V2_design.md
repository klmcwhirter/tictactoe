# tictactoe - V2 design

## Overview

The app architecture involves the following:

| Architectural Element | Link | Purpose |
| --- | --- | --- |
| docker compose | [compose.yml](../compose.yml) | Orchestrate Lifecycle |
| nginx | [ui/Containerfile](../ui/Containerfile) | Serve app |
| ui | [ui/](../ui/) | app implementation |
| solidjs | | framework |
| tailwindcss | | style library |
| vite | | app build automation |

## SPA

| Class | Purpose |
| --- | --- |
| App | app composition |
| AppContext | game state, inter-component actions |
| Board | playing surface |
| Toolbar | app header, game related actions |

## Models

| Concept | Purpose |
| --- | --- |
| WAYS_TO_WIN | list of board cell combinations that constitute a winning game |
| AppModel | app state and operations |
| GameModel | game state and operations |
| Move | models a player move |
