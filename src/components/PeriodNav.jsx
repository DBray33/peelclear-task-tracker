import { billingPeriods } from '../data/tasks';

const statusStyles = {
  paid: 'bg-green-100 text-green-700 border-green-200',
  pending: 'bg-warning/10 text-warning border-warning/30',
  current: 'bg-primary text-white border-primary',
  upcoming: 'bg-light-bg text-secondary border-border',
};

export default function PeriodNav({ selectedPeriod, onPeriodChange }) {
  return (
    <div className="px-4 py-3 md:px-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[13px] text-secondary font-medium whitespace-nowrap mr-1">Period:</span>
        {billingPeriods.map((period) => {
          const isSelected = period.id === selectedPeriod;
          const baseStyles = statusStyles[period.status] || statusStyles.upcoming;

          const isUpcoming = period.status === 'upcoming';

          return (
            <button
              key={period.id}
              onClick={() => !isUpcoming && onPeriodChange(period.id)}
              disabled={isUpcoming}
              className={`
                px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all whitespace-nowrap
                ${isUpcoming
                  ? 'bg-light-bg text-secondary/50 border-border cursor-not-allowed'
                  : isSelected
                    ? 'bg-dark text-white border-dark shadow-sm'
                    : baseStyles + ' hover:opacity-80'
                }
              `}
            >
              {period.label}
              {period.status === 'current' && !isSelected && (
                <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
