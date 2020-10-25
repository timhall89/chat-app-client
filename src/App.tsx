import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        Chatty
      </header>
      <main className="main-grid">
        <div className="message-list">

        </div>
        <form>
          <input id="m" /><button>Send</button>
        </form>
      </main>
    </div>
  );
}

export default App;
