import { tasks, billingInfo, clientInfo, providerInfo, backlog } from '../data/tasks';

export function generateSummary() {
  const resolvedTasks = tasks.filter(t => t.status === 'Resolved');
  const openTasks = tasks.filter(t => t.status !== 'Resolved');

  const totalHours = tasks.reduce((sum, t) => sum + (t.hours || 0), 0);
  const totalAmount = totalHours * billingInfo.rate;

  let output = `PEELCLEAR WEBSITE MAINTENANCE - TASK TRACKER
============================================

BILLING PERIOD: ${billingInfo.currentPeriod}
${billingInfo.periodNote ? `Note: ${billingInfo.periodNote}` : ''}

SUMMARY
-------
Total Hours: ${totalHours.toFixed(2)}
Amount Due: $${totalAmount.toFixed(2)} (@ $${billingInfo.rate}/hr)
Open Tasks: ${openTasks.length}
Resolved Tasks: ${resolvedTasks.length}


`;

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

  if (backlog.length > 0) {
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
Hours: ${task.hours || 0}

`;

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

  if (task.notes) {
    output += `Notes: ${task.notes}

`;
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
