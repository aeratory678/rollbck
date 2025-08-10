// rollbck: minimalist AI chat with typewriter effect and stopwatch

const chatContainer = document.getElementById('chat-container');
const inputBox = document.getElementById('input-box');
const sendBtn = document.getElementById('send-btn');
const stopwatch = document.getElementById('stopwatch');

let startTime = null;
let stopwatchInterval = null;
let chatStarted = false;
let lastMessage = 'THIS IS AN EXPERIMENT,I WILL REPEAT YOU OVER AND OVER AGAIN.';

function startStopwatch() {
    if (!chatStarted) {
        startTime = Date.now();
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        chatStarted = true;
    }
}

function updateStopwatch() {
    const elapsed = Date.now() - startTime;
    const seconds = Math.floor((elapsed / 1000) % 60);
    const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
    stopwatch.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function addMessage(content, sender, isTyping = false) {
    const msg = document.createElement('div');
    msg.className = `message ${sender}`;
    if (isTyping) {
        msg.classList.add('typing');
    }
    msg.textContent = '';
    chatContainer.appendChild(msg);
    if (isTyping) {
        typeWriter(content, msg, () => {
            msg.classList.remove('typing');
            setTimeout(() => {
                addMessage(content, 'user');
                lastMessage = content;
                setTimeout(() => sendMessage(lastMessage), 500);
            }, 500);
        }, 10); // Faster typing effect
    } else {
        msg.textContent = content;
    }
    // Always scroll to bottom after adding message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function typeWriter(text, element, callback, speed = 30) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll as it types
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

async function sendMessage(message) {
    startStopwatch();
    if (chatContainer.children.length === 0) {
        addMessage(message, 'user');
    }
    // Call ai.hackclub.com API with max_completion_tokens for short response
    const response = await fetch('https://ai.hackclub.com/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            messages: [{ role: 'user', content: message }],
            model: 'meta-llama/llama-4-maverick-17b-128e-instruct',
            max_completion_tokens: 32 // keep response short
        })
    });
    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || '...';
    addMessage(aiMessage, 'ai', true);
}

// Start with "hello"
window.onload = () => {
    sendMessage(lastMessage);
};