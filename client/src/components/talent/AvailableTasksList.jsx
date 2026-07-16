import { useMemo, useState } from 'react';
import TaskCard from './TaskCard';

const FILTERS = ['All', 'Open', 'Claimed', 'Submitted', 'Approved', 'Rejected'];

const AvailableTasksList = ({ tasks = [], onClaimed }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === 'All' || task.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, activeFilter]);

  return (
    <div className="space-y-5">
      {/* Search + Count */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search available tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md bg-bg-input border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary outline-none placeholder:text-[#6B7280] focus:border-primary"
        />

        <span className="text-sm text-text-muted">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} available
        </span>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all border ${
              activeFilter === filter
                ? 'bg-primary text-white border-primary'
                : 'bg-bg-card border-border text-text-muted hover:border-primary hover:text-text-primary'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Tasks / Empty State */}
      {filteredTasks.length === 0 ? (
        <div className="bg-bg-card border border-dashed border-border rounded-xl py-12 px-6 text-center">
          <div className="text-4xl mb-3">
            {tasks.length === 0 ? '📭' : '🎯'}
          </div>

          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {tasks.length === 0
              ? 'No tasks available'
              : 'No matching tasks'}
          </h3>

          <p className="text-sm text-text-muted">
            {tasks.length === 0
              ? 'Check back later for new opportunities.'
              : 'Try changing your search or selecting another filter.'}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              showClaimButton
              onClaimed={onClaimed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableTasksList;