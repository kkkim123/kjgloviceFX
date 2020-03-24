import React from 'react';
import { render } from 'react-dom';
import Users from './Users';

function App() {
    return <Users />
}

export default App;

const container = document.getElementById('app')
render(<App />, container)