import { billingInfo, billingPeriods, clientInfo, providerInfo, backlog, billingHistory, getTasksForPeriod, periodNotes, tasks as allTasks } from '../data/tasks';

export function generateSummary(periodId) {
  // Get the selected period info
  const period = billingPeriods.find(p => p.id === periodId) || billingPeriods.find(p => p.status === 'current') || billingPeriods[0];
  const effectivePeriodId = period?.id;

  // Get period-filtered tasks and UI updates
  const { tasks: periodTasks, uiUpdates: periodUiUpdates } = getTasksForPeriod(effectivePeriodId);

  const resolvedTasks = periodTasks.filter(t => t.status === 'Resolved' || t.status === 'Superseded');

  // For open tasks, count ALL open tasks (they carry over between periods)
  const openTasks = allTasks.filter(t => t.status !== 'Resolved' && t.status !== 'Superseded');

  // Get notes for this period
  const currentPeriodNotes = periodNotes.filter(n => n.billingPeriod === effectivePeriodId);

  // Filter billing history by period
  const periodBillingHistory = billingHistory.filter(entry => entry.period === period?.fullLabel);

  // For past periods (paid/pending), use billingHistory for hours/amount
  const isPastPeriod = period?.status === 'paid' || period?.status === 'pending';

  let totalHours, totalAmount;

  if (isPastPeriod && periodBillingHistory.length > 0) {
    totalHours = periodBillingHistory.reduce((sum, entry) => sum + entry.hours, 0);
    totalAmount = periodBillingHistory.reduce((sum, entry) => sum + entry.amount, 0);
  } else {
    const taskHours = periodTasks.reduce((sum, t) => sum + (t.hours || 0), 0);
    const uiHours = periodUiUpdates.reduce((sum, u) => sum + (u.hours || 0), 0);
    totalHours = taskHours + uiHours;
    totalAmount = totalHours * billingInfo.rate;
  }

  let output = `PEELCLEAR WEBSITE MAINTENANCE - TASK TRACKER
============================================

BILLING PERIOD: ${period?.fullLabel || 'Unknown'}
${period?.note ? `Note: ${period.note}` : ''}

SUMMARY
-------
Total Hours: ${totalHours.toFixed(2)}
Amount Due: $${totalAmount.toFixed(2)} (@ $${billingInfo.rate}/hr)
Open Tasks: ${openTasks.length}
Resolved Tasks: ${resolvedTasks.length}


`;

  // Notes & Q&A
  if (currentPeriodNotes.length > 0) {
    output += `NOTES & Q&A
===========

`;
    currentPeriodNotes.forEach(noteGroup => {
      output += `[${noteGroup.date}] ${noteGroup.source}
`;
      noteGroup.items.forEach(item => {
        output += `
${item.label}:
${item.content}
`;
      });
      output += `
`;
    });
  }

  if (resolvedTasks.length > 0) {
    output += `RESOLVED TASKS
==============

`;
    resolvedTasks.forEach(task => {
      output += formatTask(task);
    });
  }

  if (openTasks.length > 0) {
    output += `OPEN TASKS
==========

`;
    openTasks.forEach(task => {
      output += formatTask(task);
    });
  }

  if (periodUiUpdates.length > 0) {
    output += `UI/UX UPDATES
=============

`;
    periodUiUpdates.forEach(update => {
      output += formatUiUpdate(update);
    });
  }

  // Only show backlog on current period
  if (period?.status === 'current' && backlog.length > 0) {
    output += `BACKLOG
=======

`;
    backlog.forEach((item, i) => {
      output += `${i + 1}. ${item.item}
   Priority: ${item.priority}
   Source: ${item.source}
   ${item.notes ? `Notes: ${item.notes}` : ''}

`;
    });
  }

  if (periodBillingHistory && periodBillingHistory.length > 0) {
    output += `BILLING HISTORY
===============

`;
    periodBillingHistory.forEach(entry => {
      output += `${entry.task} | ${entry.hours.toFixed(2)} | $${entry.amount.toFixed(2)}
`;
    });
    const totalHrs = periodBillingHistory.reduce((sum, e) => sum + e.hours, 0);
    const totalAmt = periodBillingHistory.reduce((sum, e) => sum + e.amount, 0);
    output += `TOTAL | ${totalHrs.toFixed(2)} | $${totalAmt.toFixed(2)}

`;
  }

  output += `
--------------------------------------------
CLIENT: ${clientInfo.client}
Contacts: ${clientInfo.contacts.join(', ')}
Communication: ${clientInfo.communication}

PROVIDER: ${providerInfo.name}
Contact: ${providerInfo.contact}
Rate: ${providerInfo.rate} (${providerInfo.increments})
`;

  return output;
}

function formatTask(task) {
  let output = `[${task.number}] ${task.title}
Status: ${task.status}${task.priority ? ' | PRIORITY' : ''}
Date Added: ${task.dateAdded}${task.dateResolved ? ` | Resolved: ${task.dateResolved}` : ''}
${task.source ? `Source: ${task.source}` : ''}
Hours: ${task.hours || 0}${task.hoursNote ? ` (${task.hoursNote})` : ''}

`;

  // Prior period hours
  if (task.priorPeriodHours && Object.keys(task.priorPeriodHours).length > 0) {
    output += `Prior Billing:
`;
    Object.entries(task.priorPeriodHours).forEach(([periodId, data]) => {
      const hours = typeof data === 'object' ? data.hours : data;
      const note = typeof data === 'object' ? data.note : null;
      output += `  - ${periodId}: ${hours} hrs${note ? ` (${note})` : ''}
`;
    });
    output += `
`;
  }

  if (task.issue) {
    output += `Issue: ${task.issue}

`;
  }

  if (task.investigation) {
    output += `Investigation: ${task.investigation}

`;
  }

  if (task.likelyCauses && task.likelyCauses.length > 0) {
    output += `Likely Causes:
${task.likelyCauses.map(c => `  - ${c}`).join('\n')}

`;
  }

  if (task.solution) {
    output += `Solution: ${task.solution}

`;
  }

  if (task.tasks && task.tasks.length > 0) {
    output += `Tasks:
${task.tasks.map(t => `  - ${t}`).join('\n')}

`;
  }

  if (task.notes) {
    output += `Notes: ${task.notes}

`;
  }

  if (task.codeSnippet) {
    output += `Code Snippet:
------------------------------------------------------------
${task.codeSnippet}
------------------------------------------------------------

`;
  }

  if (task.sessionNotes && task.sessionNotes.length > 0) {
    output += `Session Notes:
`;
    task.sessionNotes.forEach(session => {
      output += `  [${session.date}]
`;
      if (session.summary) {
        output += `  Summary: ${session.summary}
`;
      }
      if (session.debugEnvironment) {
        output += `  Debug Environment: ${session.debugEnvironment}
`;
      }
      if (session.confirmed && session.confirmed.length > 0) {
        output += `  Confirmed:
${session.confirmed.map(c => `    - ${c}`).join('\n')}
`;
      }
      if (session.testsCompleted && session.testsCompleted.length > 0) {
        output += `  Tests Completed:
`;
        session.testsCompleted.forEach(test => {
          output += `    * ${test.test}
`;
          if (test.settingsBefore) {
            output += `      Settings Before: ${test.settingsBefore}
`;
          }
          output += `      Action: ${test.action}
      Result: ${test.result}
`;
          if (test.rolledBack) {
            output += `      [Rolled Back]
`;
          }
          if (test.rollbackConfirmed) {
            output += `      Rollback Confirmed: ${test.rollbackConfirmed}
`;
          }
        });
      }
      if (session.currentStatus) {
        output += `  Current Status: ${session.currentStatus}
`;
      }
      if (session.additionalNotes) {
        output += `  Additional Notes: ${session.additionalNotes}
`;
      }
      if (session.nextSteps && session.nextSteps.length > 0) {
        output += `  Next Steps:
${session.nextSteps.map(s => `    - ${s}`).join('\n')}
`;
      }
      output += `
`;
    });
  }

  if (task.resources && task.resources.length > 0) {
    output += `Resources:
${task.resources.map(r => `  ${r.name}:\n  ${r.url}`).join('\n\n')}

`;
  }

  output += `---

`;

  return output;
}

function formatUiUpdate(update) {
  let output = `[${update.date}] - ${update.hours} hours
`;

  if (update.pending && update.pending.length > 0) {
    output += `Pending:
${update.pending.map(p => `  - ${p}`).join('\n')}

`;
  }

  if (update.updates && update.updates.length > 0) {
    output += `Completed:
${update.updates.map(u => `  - ${u}`).join('\n')}

`;
  }

  if (update.notes) {
    output += `Notes: ${update.notes}

`;
  }

  if (update.resources && update.resources.length > 0) {
    output += `Resources:
${update.resources.map(r => `  ${r.name}:\n  ${r.url}`).join('\n\n')}

`;
  }

  output += `---

`;

  return output;
}
