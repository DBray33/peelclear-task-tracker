import { useState } from 'react';

// Label patterns for highlighting special terms
const labelPatterns = [
  // Results/Success
  { pattern: /^(Results?:)/i, className: 'text-green-700 font-semibold' },
  { pattern: /^(Verified Working:)/i, className: 'text-green-700 font-semibold' },
  { pattern: /^(FINAL VALIDATION:)/i, className: 'text-green-700 font-semibold' },
  { pattern: /^(FULLY RESOLVED[.:]?)/i, className: 'text-green-700 font-semibold' },
  // Warnings/Rollback
  { pattern: /^(Rollback:)/i, className: 'text-warning font-semibold' },
  { pattern: /^(Pending:)/i, className: 'text-warning font-semibold' },
  { pattern: /^(To revert:)/i, className: 'text-warning font-semibold' },
  // Errors/Blockers
  { pattern: /^(DO NOT[^.]*)/i, className: 'text-red-600 font-semibold' },
  { pattern: /^(Blocked:)/i, className: 'text-red-600 font-semibold' },
  { pattern: /^(ROOT CAUSE[^:]*:)/i, className: 'text-red-600 font-semibold' },
  // Info/Context
  { pattern: /^(CLEANUP:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(TESTING COUPON:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(ELEMENTOR RECOVERY:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(ELEMENTOR HERO STRUCTURE:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(BACKGROUND VIDEO URLS:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(MOBILE PLAYBACK:)/i, className: 'text-primary font-semibold' },
  { pattern: /^(Debug environment:)/i, className: 'text-primary font-semibold' },
  // Testing
  { pattern: /^(PRE-FIX TEST:)/i, className: 'text-secondary font-semibold' },
  { pattern: /^(POST-FIX TEST[^:]*:)/i, className: 'text-secondary font-semibold' },
  { pattern: /^(Work tracked in)/i, className: 'text-secondary font-semibold' },
  { pattern: /^(Affected)/i, className: 'text-secondary font-semibold' },
  { pattern: /^(Agent was)/i, className: 'text-secondary font-semibold' },
];

// Helper to render text with label styling
function renderWithLabels(text) {
  for (const { pattern, className } of labelPatterns) {
    const match = text.match(pattern);
    if (match) {
      const label = match[1];
      const rest = text.slice(match[0].length).trim();
      return (
        <>
          <span className={className}>{label}</span>
          {rest && <span> {rest}</span>}
        </>
      );
    }
  }
  return text;
}

// Parse and style text content
function parseText(text, options = {}) {
  if (!text) return null;
  const { showPanel = true } = options;

  // Split by sentence-ending patterns
  const sentences = text.split(/(?<=[.!])\s+(?=[A-Z])/).filter(s => s.trim());

  const content = sentences.length <= 1 ? (
    <p className="text-[14px] text-dark leading-relaxed">{renderWithLabels(text)}</p>
  ) : (
    <div className="space-y-2">
      {sentences.map((sentence, idx) => (
        <div key={idx} className="text-[14px] text-dark leading-relaxed">
          {renderWithLabels(sentence.trim())}
        </div>
      ))}
    </div>
  );

  if (showPanel) {
    return <div className="p-3 bg-light-bg rounded-lg">{content}</div>;
  }
  return content;
}

// Parse task checklist items with [DONE] styling
function parseTaskItem(item) {
  const isDone = item.includes('[DONE]');
  const hasSeeRef = item.match(/\[see \[(\d+)\]\]/i);

  let displayText = item;

  if (isDone) {
    displayText = displayText.replace('[DONE]', '').trim();
    // Also remove trailing reference like "[see [018]]"
    displayText = displayText.replace(/\s*\[see \[\d+\]\]/i, '').trim();
  }

  return (
    <div className={`flex items-start gap-2 ${isDone ? 'opacity-70' : ''}`}>
      {isDone ? (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600 flex-shrink-0 mt-0.5">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-light-bg text-secondary flex-shrink-0 mt-0.5">
          <span className="w-2 h-2 rounded-full bg-secondary/50"></span>
        </span>
      )}
      <span className={isDone ? 'line-through text-secondary' : ''}>
        {displayText}
        {hasSeeRef && isDone && (
          <span className="ml-2 text-[12px] text-primary font-medium no-underline" style={{ textDecoration: 'none' }}>
            [{hasSeeRef[1]}]
          </span>
        )}
      </span>
    </div>
  );
}

// Parse likely causes as styled list
function parseLikelyCauses(causes) {
  if (!causes || causes.length === 0) return null;

  return (
    <div className="p-3 bg-light-bg rounded-lg">
      <div className="space-y-2">
        {causes.map((cause, idx) => (
          <div key={idx} className="flex items-start gap-2 text-[14px] text-dark">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-warning/20 text-warning flex-shrink-0 mt-0.5 text-[11px] font-bold">
              {idx + 1}
            </span>
            <span>{cause}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Parse resources list
function parseResources(resources) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="p-3 bg-light-bg rounded-lg">
      <div className="space-y-2">
        {resources.map((resource, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-primary/10 text-primary flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </span>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-primary hover:underline"
            >
              {resource.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusStyles = {
  'Open': 'bg-light-bg text-dark',
  'In Progress': 'bg-warning/20 text-warning',
  'Resolved': 'bg-success text-white',
  'Cannot Reproduce': 'bg-purple/20 text-purple',
  'Superseded': 'bg-secondary/20 text-secondary',
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
            {task.resolvedBy && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                By {task.resolvedBy}
              </span>
            )}
            {task.blocked && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-600">
                {task.blocked}
              </span>
            )}
            {task.hours > 0 ? (
              <span className="text-[13px] text-secondary">
                {task.hours} hrs
              </span>
            ) : task.hoursNote && (
              <span className="text-[12px] text-primary italic">
                {task.hoursNote}
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
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4 pt-1 border-t border-border max-h-[60vh] overflow-y-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-secondary mb-3 pt-3">
            <span>Added: {task.dateAdded}</span>
            {task.dateResolved && <span>Resolved: {task.dateResolved}</span>}
            {task.source && <span className="text-primary">Source: {task.source}</span>}
          </div>

          {/* Issue */}
          <div className="mb-3">
            <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
              Issue
            </h4>
            {Array.isArray(task.issue) ? (
              <div className="p-3 bg-light-bg rounded-lg space-y-2">
                {task.issue.map((item, index) => (
                  <div key={index} className="flex items-start gap-2 text-[14px] text-dark">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : (
              parseText(task.issue)
            )}
          </div>

          {/* Investigation */}
          {task.investigation && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Investigation
              </h4>
              {parseText(task.investigation)}
            </div>
          )}

          {/* Root Cause */}
          {task.rootCause && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Root Cause
              </h4>
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                {parseText(task.rootCause, { showPanel: false })}
              </div>
            </div>
          )}

          {/* Likely Causes */}
          {task.likelyCauses && task.likelyCauses.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Likely Causes
              </h4>
              {parseLikelyCauses(task.likelyCauses)}
            </div>
          )}

          {/* Solution */}
          {task.solution && (Array.isArray(task.solution) ? task.solution.length > 0 : true) && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Solution
              </h4>
              {Array.isArray(task.solution) ? (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200 space-y-2">
                  {task.solution.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-[14px] text-dark">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  {parseText(task.solution, { showPanel: false })}
                </div>
              )}
            </div>
          )}

          {/* Test Results */}
          {task.testResults && task.testResults.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Test Results
              </h4>
              <div className="p-3 bg-light-bg rounded-lg space-y-2">
                {task.testResults.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[14px] text-dark">
                    <span className="text-secondary mt-0.5">•</span>
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tasks (subtasks/checklist) */}
          {task.tasks && task.tasks.length > 0 && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Tasks
              </h4>
              <div className="p-3 bg-light-bg rounded-lg space-y-2">
                {task.tasks.map((item, index) => (
                  <div key={index} className="text-[14px] text-dark">
                    {parseTaskItem(item)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="mb-3">
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Notes
              </h4>
              {parseText(task.notes)}
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

                  {session.debugEnvironment && (
                    <div className="mb-2 p-2 bg-white rounded border border-border">
                      <span className="text-[12px] font-semibold text-primary">Debug Environment:</span>
                      <p className="text-[13px] text-dark mt-1">{session.debugEnvironment}</p>
                    </div>
                  )}

                  {session.confirmed && session.confirmed.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold text-secondary uppercase">Confirmed:</span>
                      <ul className="mt-1 space-y-1">
                        {session.confirmed.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark">
                            <span className="text-green-600 mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
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
                            <p className="text-[12px] text-secondary mt-1">
                              <span className="font-medium">Settings before:</span> {test.settingsBefore}
                            </p>
                          )}
                          <p className="text-[12px] text-secondary mt-1">
                            <span className="font-medium">Action:</span> {test.action}
                          </p>
                          <p className={`text-[12px] mt-1 font-medium ${test.result.includes('NOT FIXED') || test.result.includes('RETURN') ? 'text-red-600' : 'text-green-600'}`}>
                            Result: {test.result}
                          </p>
                          {test.rolledBack && (
                            <span className="inline-block mt-1 text-[11px] bg-warning/20 text-warning px-2 py-0.5 rounded">
                              Rolled back
                            </span>
                          )}
                          {test.rollbackConfirmed && (
                            <span className="inline-block mt-1 ml-1 text-[11px] bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              {test.rollbackConfirmed}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {session.currentStatus && (
                    <div className={`mb-2 p-2 rounded border ${session.currentStatus.includes('RESOLVED') ? 'bg-green-100 border-green-300' : 'bg-white border-border'}`}>
                      <span className="text-[12px] font-semibold text-secondary uppercase">Current Status:</span>
                      <p className={`text-[14px] mt-1 font-medium ${session.currentStatus.includes('RESOLVED') ? 'text-green-800' : 'text-dark'}`}>{session.currentStatus}</p>
                    </div>
                  )}

                  {session.additionalNotes && (
                    <div className="mb-2">
                      <span className="text-[12px] font-semibold text-secondary uppercase">Additional Notes:</span>
                      <p className="text-[13px] text-dark mt-1">{session.additionalNotes}</p>
                    </div>
                  )}

                  {session.nextSteps && session.nextSteps.length > 0 && (
                    <div>
                      <span className="text-[12px] font-semibold text-secondary uppercase">Next Steps:</span>
                      <ul className="mt-1 space-y-1">
                        {session.nextSteps.map((step, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark">
                            <span className="text-primary">→</span>
                            <span>{step}</span>
                          </li>
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
              <h4 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
                Resources
              </h4>
              {parseResources(task.resources)}
            </div>
          )}

          {/* Prior Period Hours - for carryover tasks */}
          {task.priorPeriodHours && Object.keys(task.priorPeriodHours).length > 0 && (
            <div className="mt-4 pt-3 border-t border-border">
              <div className="p-2 bg-warning/10 rounded-lg border border-warning/30">
                <span className="text-[12px] font-semibold text-warning uppercase">Prior Billing</span>
                <div className="mt-1 space-y-2">
                  {Object.entries(task.priorPeriodHours).map(([periodId, data]) => {
                    // Handle both old format (just hours) and new format (object with hours and note)
                    const hours = typeof data === 'object' ? data.hours : data;
                    const note = typeof data === 'object' ? data.note : null;
                    const periodLabel = periodId.replace(/-/g, ' ').replace(/(\d{4})/, ', $1').replace('jan', 'Jan').replace('feb', 'Feb');

                    return (
                      <div key={periodId} className="text-[13px]">
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">{periodLabel}</span>
                          <span className="text-dark font-medium">{hours} hrs billed</span>
                        </div>
                        {note && (
                          <p className="text-[12px] text-secondary italic mt-0.5">{note}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
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
