import { billingPeriods, getAllOpenTasks } from '../data/tasks';

export default function PeriodNav({ selectedPeriod, onPeriodChange }) {
  const openCount = getAllOpenTasks().length;

  // Tabs: Open Tasks first, then periods in reverse chronological order
  const periodTabs = [...billingPeriods].reverse();

  return (
    <div className="px-4 py-3 md:px-6">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {/* Open Tasks tab */}
        <button
          onClick={() => onPeriodChange('open-tasks')}
          className={`
            px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all whitespace-nowrap
            ${selectedPeriod === 'open-tasks'
              ? 'bg-dark text-white border-dark shadow-sm'
              : 'bg-white text-dark border-border hover:border-dark/30'
            }
          `}
        >
          Open Tasks
          <span className={`ml-1.5 text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
            selectedPeriod === 'open-tasks'
              ? 'bg-white/20 text-white'
              : 'bg-primary/10 text-primary'
          }`}>
            {openCount}
          </span>
        </button>

        {/* Period tabs */}
        {periodTabs.map((period) => {
          const isSelected = period.id === selectedPeriod;
          const isCurrent = period.status === 'current';

          return (
            <button
              key={period.id}
              onClick={() => onPeriodChange(period.id)}
              className={`
                px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all whitespace-nowrap
                ${isSelected
                  ? 'bg-dark text-white border-dark shadow-sm'
                  : isCurrent
                    ? 'bg-primary/10 text-primary border-primary/30 hover:border-primary/50'
                    : 'bg-white text-secondary border-border hover:border-dark/30 hover:text-dark'
                }
              `}
            >
              {period.fullLabel}
              {isCurrent && !isSelected && (
                <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
