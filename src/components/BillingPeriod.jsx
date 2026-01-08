import { billingInfo, tasks } from '../data/tasks';

export default function BillingPeriod() {
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);
  const amountDue = totalHours * billingInfo.rate;

  return (
    <div className="px-4 pb-4 md:px-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[17px] font-semibold text-dark">Billing Period</h2>
          <span className="text-[13px] px-2 py-1 bg-light-bg rounded-full text-secondary">
            {amountDue > 0 ? 'Pending' : 'Paid'}
          </span>
        </div>

        <div className="space-y-2 text-[15px]">
          <div className="flex justify-between">
            <span className="text-secondary">Period</span>
            <span className="text-dark font-medium">{billingInfo.currentPeriod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Rate</span>
            <span className="text-dark font-medium">${billingInfo.rate}/hour</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">Increments</span>
            <span className="text-dark font-medium">15 minutes</span>
          </div>
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
      </div>
    </div>
  );
}
