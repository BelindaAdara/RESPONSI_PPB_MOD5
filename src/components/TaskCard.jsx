import { formatDate } from '../utils/storage'

const priorityClassMap = {
  Low: 'priority-low',
  Medium: 'priority-medium',
  High: 'priority-high',
}

const statusClassMap = {
  'To Do': 'status-todo',
  'In Progress': 'status-progress',
  Completed: 'status-completed',
}

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  return (
    <article className="task-card">
      <div className="task-card__header">
        <div>
          <h3>{task.title}</h3>
          <p>{task.course}</p>
        </div>
        <div className={`task-card__priority ${priorityClassMap[task.priority]}`}>
          {task.priority}
        </div>
      </div>

      <p className="task-card__description">{task.description}</p>

      <div className="task-card__meta">
        <div>
          <span className="meta-label">Deadline</span>
          <strong>{formatDate(task.deadline)}</strong>
        </div>
        <div>
          <span className="meta-label">Status</span>
          <select
            value={task.status}
            onChange={(event) => onStatusChange(task.id, event.target.value)}
            className={`task-card__status ${statusClassMap[task.status]}`}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="task-card__actions">
        <button type="button" className="btn btn-secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
