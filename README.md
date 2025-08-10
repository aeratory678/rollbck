# rollbck

**rollbck** is a minimalist AI chat experiment built with vanilla HTML, CSS, and JavaScript. It features a typewriter effect for AI responses, a stopwatch timer, and a sleek, glassmorphic UI. The app demonstrates an interactive conversation loop with an AI model, designed for experimentation and playful user engagement.

## Features

- **Minimalist Chat UI:** Clean, modern layout with a glassmorphic effect and animated chat bubbles.
- **Typewriter Effect:** AI responses are displayed character by character for an engaging experience.
- **Stopwatch Timer:** Tracks elapsed time since the chat began.
- **Auto-Scrolling:** Chat window always stays scrolled to the latest message.
- **Looped Conversation:** The AI repeats user messages, emphasizing the experimental nature.

## How It Works

- The app starts the conversation with a preset message:  
  `THIS IS AN EXPERIMENT,I WILL REPEAT YOU OVER AND OVER AGAIN.`
- Each user message is sent to the [Hack Club AI API](https://ai.hackclub.com/chat/completions) using the Meta Llama model (`meta-llama/llama-4-maverick-17b-128e-instruct`).
- AI responses are rendered with a typing animation, then echoed back as a user message, creating a loop.
- The stopwatch begins on the first message and updates every second.

## File Overview

- `index.html`  
  Sets up the structure and containers for chat, logo, stopwatch, and links to assets.

- `style.css`  
  Applies a vibrant gradient background, glassmorphic card effects, chat bubble animations, and responsive styles for desktop and mobile.

- `script.js`  
  Handles message rendering, typewriter animation, API interaction, and stopwatch logic.  
  - Uses async fetch to call the Hack Club AI endpoint.
  - Manages message flow and timing.
  - Scrolls chat to the bottom on each new message.

## Usage

1. Clone the repository:
   ```sh
   git clone https://github.com/aeratory678/rollbck.git
   ```
2. Open `index.html` in your browser.

## Customization

- To change the AI model or endpoint, edit the fetch call in `script.js`.
- Adjust visual styles in `style.css` for different themes or layouts.

## Credits

- Built by [aeratory678](https://github.com/aeratory678)
- AI API by [Hack Club](https://ai.hackclub.com/)
- Inspired by minimalist design and experimental AI conversations.



MIT
