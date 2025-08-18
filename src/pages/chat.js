import React from 'react';
import Layout from '@theme/Layout';
import Chatbot from '@site/src/components/Chatbot';

export default function Chat() {
  return (
    <Layout title="AI Assistant" description="Chat with THU Wiki AI Assistant">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 60px)',
          padding: '0 1rem',
        }}>
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: '700px',
          }}>
          <Chatbot />
        </div>
      </div>
    </Layout>
  );
}