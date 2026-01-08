import { tasks } from '../data/tasks';

export default function StatsBar() {
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
  const amountDue = totalHours * 70;
  const openTasks = tasks.filter(t => t.status !== 'Resolved').length;
  const resolvedTasks = tasks.filter(t => t.status === 'Resolved').length;

  const stats = [
    { label: 'Hours', value: `${totalHours.toFixed(2)}`, sublabel: 'this period' },
    { label: 'Due', value: `$${amountDue.toFixed(2)}`, sublabel: 'amount' },
    { label: 'Open', value: openTasks, sublabel: 'tasks' },
    { label: 'Resolved', value: resolvedTasks, sublabel: 'tasks' },
  ];

  return (
    <div className="px-4 py-4 md:px-6">
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-3 md:p-4 text-center shadow-sm border border-border"
          >
            <div className="text-lg md:text-xl font-semibold text-dark">
              {stat.value}
            </div>
            <div className="text-[13px] text-secondary leading-tight mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
