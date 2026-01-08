import Header from './components/Header';
import StatsBar from './components/StatsBar';
import BillingPeriod from './components/BillingPeriod';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-light-bg">
      <Header />
      <main className="max-w-3xl mx-auto">
        <TaskList />
        <StatsBar />
        <BillingPeriod />
      </main>
      <Footer />
    </div>
  );
}

export default App;
