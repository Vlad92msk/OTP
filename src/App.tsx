import React from 'react';
import './App.css';
import { Magazine } from './Components/Magazine';

const tovar = [
  {
      price: 100,
      name: 'Товар 1'
  },
  {
    price: 50,
    name: 'Товар 2'
},
{
  price: 250,
  name: 'Товар 3'
},
{
  price: 92,
  name: 'Товар 4'
},
]

function App() {
  return (
    <div className="App">
      <Magazine  arr={tovar}/>
    </div>
  );
}

export default App;
