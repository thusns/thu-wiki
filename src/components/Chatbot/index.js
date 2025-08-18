import React from 'react';

export default function Chatbot({ className }) {
  return (
    <div className={className}>
      <iframe
        src="https://udify.app/chatbot/G3NlLLr4cfsSo9Xa"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '700px',
          border: 'none'
        }}
        allow="microphone"
        title="THU Wiki Chatbot"
      />
    </div>
  );
}