import { useState } from 'react';

const statusStyles = {
  'Open': 'bg-light-bg text-dark',
  'In Progress': 'bg-warning/20 text-warning',
  'Resolved': 'bg-success text-white',
  'Cannot Reproduce': 'bg-purple/20 text-purple',
};

export default function TaskCard({ task, isExpanded, onToggle }) {
  const statusClass = statusStyles[task.status] || statusStyles['Open'];
  const cost = task.hours * 70;

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-shadow duration-300 ${
        isExpanded ? 'shadow-md' : ''
      } ${task.priority ? 'border-l-4 border-l-primary' : ''}`}
    >
      {/* Collapsed Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center gap-3 min-h-[44px] text-left"
      >
        {/* Task Number Badge */}
        <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-light-bg flex items-center justify-center text-[13px] font-semibold text-secondary">
          {task.number}
        </span>

        {/* Title and Status */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {task.priority && (
              <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">
                Priority
              </span>
            )}
          </div>
          <h3 className="text-[15px] font-medium text-dark truncate pr-2">
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${statusClass}`}>
              {task.status}
            </span>
            {task.hours > 0 && (
              <span className="text-[13px] text-secondary">
                {task.hours} hrs
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
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
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-border max-h-[60vh] overflow-y-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-secondary mb-3 pt-3">
            <span>Added: {task.dateAdded}</span>
            {task.dateResolved && <span>Resolved: {task.dateResolved}</span>}
          </div>

          {/* Issue */}
          <div className="mb-3">
            <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
              Issue
            </h4>
            {Array.isArray(task.issue) ? (
              <ul className="list-disc list-inside text-[15px] text-dark space-y-1">
                {task.issue.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] text-dark leading-relaxed">
                {task.issue}
              </p>
            )}
          </div>

          {/* Investigation */}
          {task.investigation && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
                Investigation
              </h4>
              <p className="text-[15px] text-dark leading-relaxed">
                {task.investigation}
              </p>
            </div>
          )}

          {/* Likely Causes */}
          {task.likelyCauses && task.likelyCauses.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
                Likely Causes
              </h4>
              <ul className="list-disc list-inside text-[15px] text-dark space-y-1">
                {task.likelyCauses.map((cause, index) => (
                  <li key={index}>{cause}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Solution */}
          {task.solution && (Array.isArray(task.solution) ? task.solution.length > 0 : true) && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
                Solution
              </h4>
              {Array.isArray(task.solution) ? (
                <ul className="list-disc list-inside text-[15px] text-dark space-y-1">
                  {task.solution.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] text-dark leading-relaxed">
                  {task.solution}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
                Notes
              </h4>
              <p className="text-[15px] text-dark leading-relaxed">
                {task.notes}
              </p>
            </div>
          )}

          {/* Session Notes */}
          {task.sessionNotes && task.sessionNotes.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Session Notes
              </h4>
              {task.sessionNotes.map((session, idx) => (
                <div key={idx} className="mb-4 p-3 bg-light-bg rounded-lg">
                  <div className="text-[13px] font-semibold text-primary mb-2">{session.date}</div>

                  {session.summary && (
                    <p className="text-[14px] text-dark mb-2">{session.summary}</p>
                  )}

                  {session.confirmed && session.confirmed.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold text-secondary uppercase">Confirmed:</span>
                      <ul className="list-disc list-inside text-[14px] text-dark mt-1 space-y-1">
                        {session.confirmed.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {session.testsCompleted && session.testsCompleted.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold text-secondary uppercase">Tests Completed:</span>
                      {session.testsCompleted.map((test, i) => (
                        <div key={i} className="mt-2 p-2 bg-white rounded border border-border">
                          <div className="text-[13px] font-medium text-dark">{test.test}</div>
                          {test.settingsBefore && (
                            <p className="text-[12px] text-secondary mt-1">Settings before: {test.settingsBefore}</p>
                          )}
                          <p className="text-[12px] text-secondary mt-1">Action: {test.action}</p>
                          <p className={`text-[12px] mt-1 font-medium ${test.result.includes('NOT FIXED') ? 'text-red-600' : 'text-green-600'}`}>
                            Result: {test.result}
                          </p>
                          {test.rolledBack && (
                            <span className="inline-block mt-1 text-[11px] bg-warning/20 text-warning px-2 py-0.5 rounded">
                              Rolled back
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {session.nextSteps && session.nextSteps.length > 0 && (
                    <div>
                      <span className="text-[12px] font-semibold text-secondary uppercase">Next Steps:</span>
                      <ul className="list-disc list-inside text-[14px] text-dark mt-1 space-y-1">
                        {session.nextSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Resources */}
          {task.resources && task.resources.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-1">
                Resources
              </h4>
              <ul className="space-y-1">
                {task.resources.map((resource, index) => (
                  <li key={index}>
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

          {/* Hours & Cost */}
          {task.hours > 0 && (
            <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
              <span className="text-[13px] text-secondary">Time logged</span>
              <span className="text-[17px] font-semibold text-dark">{task.hours} hrs</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
