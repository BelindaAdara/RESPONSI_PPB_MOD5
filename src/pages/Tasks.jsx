import { useMemo, useState } from 'react'
import TaskCard from '../components/TaskCard'
import TaskForm from '../components/TaskForm'
import { priorityOptions, saveTasks, sortByDeadline } from '../utils/storage'

const Tasks = ({ tasks, setTasks }) => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [sortBy, setSortBy] = useState('deadline-asc')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const filteredTasks = useMemo(() => {
    let result = [...tasks]

    if (search.trim()) {
      const query = search.toLowerCase()
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.course.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query),
      )
    }

    if (statusFilter !== 'All') {
      result = result.filter((task) => task.status === statusFilter)
    }

    if (priorityFilter !== 'All') {
      result = result.filter((task) => task.priority === priorityFilter)
    }

    result = sortByDeadline(result, sortBy === 'deadline-asc' ? 'asc' : 'desc')

    return result
  }, [tasks, search, statusFilter, priorityFilter, sortBy])

  const createTask = (taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      ...taskData,
    }

    const updatedTasks = [newTask, ...tasks]
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
    setIsFormOpen(false)
    setEditingTask(null)
  }

  const updateTask = (taskData) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...taskData } : task,
    )

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
    setIsFormOpen(false)
    setEditingTask(null)
  }

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(taskData)
      return
    }

    createTask(taskData)
  }

  const handleDelete = (taskId) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')
    if (!confirmed) return

    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task,
    )

    setTasks(updatedTasks)
    saveTasks(updatedTasks)
  }

  const openCreateModal = () => {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  const openEditModal = (task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  return (
    <main className="page-content">
      <section className="tasks-toolbar">
        <div>
          <p className="eyebrow">Task Manager</p>
          <h1>My Tasks</h1>
        </div>
        <button type="button" className="btn btn-primary" onClick={openCreateModal}>
          + Tambah Tugas
        </button>
      </section>

      <section className="task-controls">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Cari tugas, mata kuliah, atau deskripsi..."
          aria-label="Search tasks"
        />

        <div className="filter-row">
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">Semua Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            <option value="All">Semua Prioritas</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="deadline-asc">Deadline: Terdekat</option>
            <option value="deadline-desc">Deadline: Terjauh</option>
          </select>
        </div>
      </section>

      <section className="task-list-wrapper">
        {filteredTasks.length > 0 ? (
          <div className="task-grid">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Belum ada tugas yang cocok</h3>
            <p>Silakan tambahkan tugas baru atau ubah filter pencarian.</p>
          </div>
        )}
      </section>

      {isFormOpen && (
        <TaskForm
          task={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false)
            setEditingTask(null)
          }}
        />
      )}
    </main>
  )
}

export default Tasks
