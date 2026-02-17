import { useState } from 'react';
import { getTasksForPeriod, getAllOpenTasks, billingPeriods, periodNotes, billingHistory } from '../data/tasks';
import TaskCard from './TaskCard';

export default function TaskList({ selectedPeriod }) {
  const [expandedTask, setExpandedTask] = useState(null);
  const [uiExpanded, setUiExpanded] = useState(false);
  const [notesExpanded, setNotesExpanded] = useState(false);
  const [billingExpanded, setBillingExpanded] = useState(false);

  const isOpenTasksView = selectedPeriod === 'open-tasks';

  const handleToggle = (taskNumber) => {
    setExpandedTask(expandedTask === taskNumber ? null : taskNumber);
  };

  // Open Tasks view - all open tasks across all periods
  if (isOpenTasksView) {
    const openTasks = getAllOpenTasks().sort((a, b) => {
      if (a.priority && !b.priority) return -1;
      if (!a.priority && b.priority) return 1;
      if (a.priority && b.priority) return b.number.localeCompare(a.number);
      return a.number.localeCompare(b.number);
    });

    return (
      <div className="px-4 pt-4 pb-4 md:px-6">
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

  // Period view - resolved tasks, UI updates, notes, billing history
  const { tasks: periodTasks, uiUpdates } = getTasksForPeriod(selectedPeriod);
  const currentPeriodNotes = periodNotes.filter(n => n.billingPeriod === selectedPeriod);
  const resolvedTasks = periodTasks
    .filter(t => t.status === 'Resolved' || t.status === 'Superseded')
    .sort((a, b) => a.number.localeCompare(b.number));

  // Get billing history for this period
  const period = billingPeriods.find(p => p.id === selectedPeriod);
  const periodBillingHistory = period?.fullLabel
    ? billingHistory.filter(entry => entry.period === period.fullLabel)
    : [];

  const hasPendingUiTasks = uiUpdates.some(u => u.pending && u.pending.length > 0);

  return (
    <div className="px-4 pt-4 pb-4 md:px-6">
      {/* Notes & Q&A Section */}
      {currentPeriodNotes.length > 0 && (
        <div className="mb-6">
          {currentPeriodNotes.map((noteGroup, idx) => (
            <div key={idx} className={`bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-shadow duration-300 ${
              notesExpanded ? 'shadow-md' : ''
            }`}>
              <button
                onClick={() => setNotesExpanded(!notesExpanded)}
                className="w-full px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div className="text-left">
                    <h3 className="text-[15px] font-medium text-dark">{noteGroup.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {noteGroup.items.length} {noteGroup.items.length === 1 ? 'item' : 'items'}
                      </span>
                      <span className="text-[13px] text-secondary">
                        {noteGroup.source} - {noteGroup.date}
                      </span>
                    </div>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-secondary transition-transform duration-300 ${
                    notesExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                notesExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="border-t border-border">
                  {noteGroup.items.map((item, itemIdx) => (
                    <div key={itemIdx} className={itemIdx > 0 ? 'border-t border-border' : ''}>
                      <div className="px-4 py-3">
                        <span className="text-[13px] font-semibold text-primary uppercase tracking-wide">
                          {item.label}
                        </span>
                        <p className="text-[14px] text-dark mt-2 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Minor Tweaks Section */}
      {uiUpdates.length > 0 && (
        <div className="mb-6">
          <div className={`bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-shadow duration-300 ${
            uiExpanded ? 'shadow-md' : ''
          }`}>
            <button
              onClick={() => setUiExpanded(!uiExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-light-bg flex items-center justify-center">
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </span>
                <div className="text-left">
                  <h3 className="text-[15px] font-medium text-dark">UI/UX Updates</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      hasPendingUiTasks
                        ? 'bg-primary/20 text-primary'
                        : 'bg-success text-white'
                    }`}>
                      {hasPendingUiTasks ? 'New Tasks' : 'No New Tasks'}
                    </span>
                    {uiUpdates.reduce((sum, u) => sum + u.hours, 0) > 0 && (
                      <span className="text-[13px] text-secondary">
                        {uiUpdates.reduce((sum, u) => sum + u.hours, 0)} hrs
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
              <div className="border-t border-border">
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
                      {dateGroup.pending && dateGroup.pending.length > 0 && (
                        <div className="mb-3">
                          <span className="text-[13px] font-semibold text-purple uppercase tracking-wide">
                            To Do
                          </span>
                          <div className="mt-2 space-y-2">
                            {dateGroup.pending.map((task, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-purple" />
                                <p className="text-[15px] text-dark">{task}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {dateGroup.updates && dateGroup.updates.length > 0 && (
                        <div>
                          <span className="text-[13px] font-semibold text-success uppercase tracking-wide">
                            Done
                          </span>
                          <div className="mt-2 space-y-2">
                            {dateGroup.updates.map((update, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full bg-success" />
                                <p className="text-[15px] text-dark">{update}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {dateGroup.notes && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <span className="text-[13px] font-semibold text-secondary uppercase tracking-wide">
                            Notes
                          </span>
                          <p className="text-[15px] text-dark mt-1 italic">{dateGroup.notes}</p>
                        </div>
                      )}
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
            </div>
          </div>
        </div>
      )}

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

      {/* Billing History */}
      {periodBillingHistory.length > 0 && (
        <div className="mb-6">
          <div className={`bg-white rounded-xl shadow-sm border border-border overflow-hidden transition-shadow duration-300 ${
            billingExpanded ? 'shadow-md' : ''
          }`}>
            <button
              onClick={() => setBillingExpanded(!billingExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                  </svg>
                </span>
                <div className="text-left">
                  <h3 className="text-[15px] font-medium text-dark">Billing History</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[13px] text-secondary">
                      {periodBillingHistory.length} {periodBillingHistory.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              </div>
              <svg
                className={`w-5 h-5 text-secondary transition-transform duration-300 ${
                  billingExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              billingExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t border-border">
                <div className="divide-y divide-border">
                  {periodBillingHistory.map((entry, i) => (
                    <div key={i} className="px-4 py-3 flex items-center justify-between">
                      <span className="text-[14px] text-dark">{entry.task}</span>
                      <div className="flex items-center gap-4 text-[14px]">
                        <span className="text-secondary">{entry.hours} hrs</span>
                        <span className="font-medium text-dark">${entry.amount.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 bg-light-bg border-t border-border flex items-center justify-between">
                  <span className="text-[14px] font-semibold text-dark">Total</span>
                  <div className="flex items-center gap-4 text-[14px]">
                    <span className="font-semibold text-secondary">
                      {periodBillingHistory.reduce((sum, e) => sum + e.hours, 0).toFixed(2)} hrs
                    </span>
                    <span className="font-semibold text-dark">
                      ${periodBillingHistory.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
