import { useEffect, useState } from 'react'
import { priorityOptions, statusOptions } from '../utils/storage'

const blankTask = {
  title: '',
  course: '',
  description: '',
  deadline: '',
  priority: 'Medium',
  status: 'To Do',
}

const TaskForm = ({ task, onSubmit, onCancel }) => {
  const [form, setForm] = useState(blankTask)

  useEffect(() => {
    setForm(
      task
        ? {
            ...task,
          }
        : blankTask,
    )
  }, [task])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <div className="modal-card__header">
          <h2>{task ? 'Edit Tugas' : 'Tambah Tugas Baru'}</h2>
          <button type="button" className="icon-button" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="field-group">
            <label htmlFor="title">Nama tugas</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Contoh: Tugas UAS Kalkulus"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="course">Mata kuliah</label>
            <input
              id="course"
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Contoh: Matematika Dasar"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="description">Deskripsi</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Jelaskan detail tugas Anda..."
              required
            />
          </div>

          <div className="form-row">
            <div className="field-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field-group">
              <label htmlFor="priority">Prioritas</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-card__actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary">
              {task ? 'Simpan Perubahan' : 'Tambah Tugas'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskForm
