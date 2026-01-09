import { useState } from 'react';
import { tasks, uiUpdates } from '../data/tasks';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [expandedTask, setExpandedTask] = useState(null);
  const [uiExpanded, setUiExpanded] = useState(false);

  const openTasks = tasks.filter(t => t.status !== 'Resolved');
  const resolvedTasks = tasks.filter(t => t.status === 'Resolved');

  // Check if there are any pending UI updates (updates added today or recently without completion)
  const hasNewUiUpdates = uiUpdates.length > 0;

  const handleToggle = (taskNumber) => {
    setExpandedTask(expandedTask === taskNumber ? null : taskNumber);
  };

  return (
    <div className="px-4 pt-4 pb-4 md:px-6">
      {/* UI/UX Updates Section */}
      <div className="mb-6">
        <button
          onClick={() => setUiExpanded(!uiExpanded)}
          className="w-full flex items-center justify-between mb-3"
        >
          <h2 className="text-[17px] font-semibold text-dark flex items-center gap-2">
            UI/UX Updates
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              hasNewUiUpdates
                ? 'bg-primary/20 text-primary'
                : 'bg-success text-white'
            }`}>
              {hasNewUiUpdates ? 'New Updates' : 'No New Updates'}
            </span>
          </h2>
          <svg
            className={`w-5 h-5 text-secondary transition-transform duration-300 ${
              uiExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          uiExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {uiUpdates.length > 0 ? (
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              {uiUpdates.map((dateGroup, index) => (
                <div key={dateGroup.date} className={index > 0 ? 'border-t border-border' : ''}>
                  <div className="px-4 py-3 bg-light-bg">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-secondary uppercase tracking-wide">
                        {dateGroup.date}
                      </span>
                      {dateGroup.hours > 0 && (
                        <span className="text-[13px] text-secondary">
                          {dateGroup.hours} hrs
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <ul className="list-disc list-inside text-[15px] text-dark space-y-1">
                      {dateGroup.updates.map((update, i) => (
                        <li key={i}>{update}</li>
                      ))}
                    </ul>
                    {dateGroup.resources && dateGroup.resources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-[13px] font-semibold text-secondary uppercase tracking-wide">
                          Resources
                        </span>
                        <ul className="mt-1 space-y-1">
                          {dateGroup.resources.map((resource, i) => (
                            <li key={i}>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[15px] text-primary hover:underline"
                              >
                                {resource.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 text-center border border-border">
              <p className="text-[15px] text-secondary">No UI/UX updates yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Resolved Tasks */}
      <div className="mb-6">
        <h2 className="text-[17px] font-semibold text-dark mb-3 flex items-center gap-2">
          Resolved
          <span className="text-[13px] font-normal text-secondary">({resolvedTasks.length})</span>
        </h2>

        {resolvedTasks.length > 0 ? (
          <div className="space-y-3">
            {resolvedTasks.map((task) => (
              <TaskCard
                key={task.number}
                task={task}
                isExpanded={expandedTask === task.number}
                onToggle={() => handleToggle(task.number)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <p className="text-[15px] text-secondary">No resolved tasks</p>
          </div>
        )}
      </div>

      {/* Open Tasks */}
      <div>
        <h2 className="text-[17px] font-semibold text-dark mb-3 flex items-center gap-2">
          Open Tasks
          <span className="text-[13px] font-normal text-secondary">({openTasks.length})</span>
        </h2>

        {openTasks.length > 0 ? (
          <div className="space-y-3">
            {openTasks.map((task) => (
              <TaskCard
                key={task.number}
                task={task}
                isExpanded={expandedTask === task.number}
                onToggle={() => handleToggle(task.number)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <p className="text-[15px] text-secondary">No open tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}
