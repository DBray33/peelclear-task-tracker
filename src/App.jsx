import { useState } from 'react';
import Header from './components/Header';
import PeriodNav from './components/PeriodNav';
import StatsBar from './components/StatsBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Default to Open Tasks tab
  const [selectedPeriod, setSelectedPeriod] = useState('open-tasks');

  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      <main className="max-w-3xl mx-auto">
        <PeriodNav selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
        <TaskList selectedPeriod={selectedPeriod} />
        <StatsBar selectedPeriod={selectedPeriod} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
