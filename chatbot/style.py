# Define the CSS for the chat messages
css = '''
<style>
/* Main container styling */
.chat-container {
    max-width: 800px;
    margin: 0 auto;
}

/* Message bubbles */
.chat-message {
    padding: 1.2rem;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    transition: transform 0.2s ease;
}

.chat-message:hover {
    transform: translateY(-2px);
}

.chat-message.user {
    background: linear-gradient(135deg, #2b313e 0%, #3a4356 100%);
    border-left: 5px solid #3b82f6;
    margin-left: 2rem;
}

.chat-message.bot {
    background: linear-gradient(135deg, #475063 0%, #5a647c 100%);
    border-left: 5px solid #10b981;
    margin-right: 2rem;
}

/* Indicator styling */
.chat-message .indicator {
    font-weight: bold;
    min-width: 85px;
    padding: 0.5rem 1rem;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    background: rgba(255,255,255,0.1);
    border-radius: 0.5rem;
    margin-right: 1rem;
}

.chat-message.user .indicator {
    background: rgba(59,130,246,0.2);
}

.chat-message.bot .indicator {
    background: rgba(16,185,129,0.2);
}

/* Message content */
.chat-message .message {
    padding: 0 1rem;
    color: #fff;
    font-size: 1rem;
    line-height: 1.5;
    flex-grow: 1;
}

/* Emoji styling */
.indicator span {
    font-size: 1.2rem;
    margin-right: 0.5rem;
}
</style>
'''

bot_template = '''
<div class="chat-message bot">
    <div class="indicator"><span>🤖</span>Bot</div>
    <div class="message">{{MSG}}</div>
</div>
'''

user_template = '''
<div class="chat-message user">
    <div class="indicator"><span>👤</span>You</div>
    <div class="message">{{MSG}}</div>
</div>
'''
