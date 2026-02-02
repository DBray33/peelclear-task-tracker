import { useState } from 'react';
import { billingPeriods, billingInfo, getPeriodStats } from '../data/tasks';
import CopyButton from './CopyButton';

export default function StatsBar({ selectedPeriod }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const period = billingPeriods.find(p => p.id === selectedPeriod);
  const stats = getPeriodStats(selectedPeriod);

  const { totalHours, amountDue, openTasks, resolvedTasks, priorHours, carryoverTasks } = stats;

  return (
    <div className="px-4 py-4 md:px-6">
      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {/* Collapsed Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xl font-semibold text-dark">{totalHours.toFixed(2)}</div>
              <div className="text-[13px] text-secondary">Hours</div>
            </div>
            <div>
              <div className="text-xl font-semibold text-dark">{period?.fullLabel || 'Unknown'}</div>
              <div className="text-[13px] text-secondary">Billing Period</div>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-secondary flex-shrink-0 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Expanded Content */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 border-t border-border">
            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-2 py-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-dark">{totalHours.toFixed(2)}</div>
                <div className="text-[13px] text-secondary">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-dark">${amountDue.toFixed(2)}</div>
                <div className="text-[13px] text-secondary">Due</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-dark">{openTasks}</div>
                <div className="text-[13px] text-secondary">Open</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-dark">{resolvedTasks}</div>
                <div className="text-[13px] text-secondary">Resolved</div>
              </div>
            </div>

            {/* Billing Details */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-[15px] font-semibold text-dark">Billing Period</h2>
                <span className={`text-[13px] px-2 py-1 rounded-full ${
                  period?.status === 'paid' ? 'bg-green-100 text-green-700' :
                  period?.status === 'pending' ? 'bg-warning/10 text-warning' :
                  period?.status === 'current' ? 'bg-primary/10 text-primary' :
                  'bg-light-bg text-secondary'
                }`}>
                  {period?.status === 'paid' ? 'Paid' :
                   period?.status === 'pending' ? 'Pending' :
                   period?.status === 'current' ? 'Current' : 'Upcoming'}
                </span>
              </div>

              <div className="space-y-2 text-[15px]">
                <div className="flex justify-between">
                  <span className="text-secondary">Period</span>
                  <span className="text-dark font-medium">{period?.fullLabel || 'Unknown'}</span>
                </div>
                {period?.note && (
                  <p className="text-[13px] text-secondary italic">{period.note}</p>
                )}
                {priorHours > 0 && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Prior Period Hours</span>
                    <span className="text-dark font-medium">{priorHours.toFixed(2)} hrs</span>
                  </div>
                )}
              </div>

              {amountDue > 0 && (
                <button
                  disabled
                  className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-300 text-gray-500 font-medium py-3 px-4 rounded-xl min-h-[44px] cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Pay ${amountDue.toFixed(2)}
                </button>
              )}

              <div className="mt-3">
                <CopyButton selectedPeriod={selectedPeriod} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
