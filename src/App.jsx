import { useState } from 'react';
import Header from './components/Header';
import PeriodNav from './components/PeriodNav';
import StatsBar from './components/StatsBar';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { billingPeriods } from './data/tasks';
import './App.css';

function App() {
  // Default to current period
  const currentPeriod = billingPeriods.find(p => p.status === 'current');
  const [selectedPeriod, setSelectedPeriod] = useState(currentPeriod?.id || billingPeriods[0]?.id);

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
