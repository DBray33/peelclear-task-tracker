import { useState } from 'react';
import { tasks } from '../data/tasks';
import TaskCard from './TaskCard';

export default function TaskList() {
  const [expandedTask, setExpandedTask] = useState(null);

  const openTasks = tasks.filter(t => t.status !== 'Resolved');
  const resolvedTasks = tasks.filter(t => t.status === 'Resolved');

  const handleToggle = (taskNumber) => {
    setExpandedTask(expandedTask === taskNumber ? null : taskNumber);
  };

  return (
    <div className="px-4 pt-4 pb-4 md:px-6">
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
