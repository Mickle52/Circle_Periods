import React from 'react';
import './css/App.css';
import TimelineComponent from './components/TimelineComponent/TimelineComponent';
import { data } from './data';
function App() {
  return (
    <div>
      <TimelineComponent data={data} />
    </div>
  );
}

export default App;
