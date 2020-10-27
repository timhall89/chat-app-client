import React, { useState, useEffect, useCallback } from 'react';
import "./App.css"
import { v4 as uuidv4 } from 'uuid';
import NameForm from './components/NameForm';
import Chat from './components/Chat';
import User from './types/User';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);


  let main;
  if (user === null) {
    main = <NameForm onSubmitName={name => setUser({ id: uuidv4(), name })} />
  } else {
    main = <Chat user={user} roomId="10" />
  }

  return (
    <div className="app">
      <header className="app-header">
        Chatty
      </header>
      <main>
        {main}
      </main>

    </div>
  );
}

export default App;
