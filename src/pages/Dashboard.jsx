import StatCard from '../components/StatCard'
import { formatDate, getTaskCounts, getUpcomingTasks } from '../utils/storage'

const Dashboard = ({ tasks }) => {
  const stats = getTaskCounts(tasks)
  const upcomingTasks = getUpcomingTasks(tasks)
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="page-content">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Selamat datang kembali</p>
          <h1>TaskMate Dashboard</h1>
        </div>
        <div className="today-pill">{today}</div>
      </section>

      <section className="stats-grid">
        <StatCard label="Total Tugas" value={stats.total} detail="Semua tugas aktif" accent="#6d5efc" />
        <StatCard label="Selesai" value={stats.completed} detail="Tugas selesai" accent="#22c55e" />
        <StatCard label="Sedang Dikerjakan" value={stats.inProgress} detail="Tahap pengerjaan" accent="#f59e0b" />
        <StatCard label="Belum Dikerjakan" value={stats.todo} detail="Belum dimulai" accent="#ef4444" />
      </section>

      <section className="panel-grid">
        <div className="summary-card">
          <div className="summary-card__header">
            <h2>Persentase Penyelesaian</h2>
          </div>
          <div className="progress-ring">
            <div className="progress-ring__inner">
              <strong>{stats.completionRate}%</strong>
              <span>Complete</span>
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card__header">
            <h2>Deadline Terdekat</h2>
          </div>
          {upcomingTasks.length > 0 ? (
            <ul className="task-list compact">
              {upcomingTasks.map((task) => (
                <li key={task.id}>
                  <div>
                    <strong>{task.title}</strong>
                    <small>{task.course}</small>
                  </div>
                  <span>{formatDate(task.deadline)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-hint">Belum ada tugas yang dekat deadline.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
