export const STORAGE_KEY = 'taskmate.tasks'

export const priorityOptions = ['Low', 'Medium', 'High']
export const statusOptions = ['To Do', 'In Progress', 'Completed']

export const defaultTasks = [
  {
    id: 'task-1',
    title: 'Membuat laporan praktikum PWA',
    course: 'Pemrograman Perangkat Bergerak',
    description: 'Menyelesaikan laporan hasil implementasi PWA dan menyiapkan dokumentasi demo.',
    deadline: '2026-11-20',
    priority: 'High',
    status: 'In Progress',
  },
  {
    id: 'task-2',
    title: 'Review materi jaringan komputer',
    course: 'Jaringan Komputer',
    description: 'Mempelajari topik routing, subnetting, dan membuat rangkuman singkat.',
    deadline: '2026-11-18',
    priority: 'Medium',
    status: 'To Do',
  },
  {
    id: 'task-3',
    title: 'Mengerjakan tugas AI dasar',
    course: 'Kecerdasan Buatan',
    description: 'Menyelesaikan kuis dan latihan tentang search dan decision tree.',
    deadline: '2026-11-22',
    priority: 'Low',
    status: 'Completed',
  },
]

export const formatDate = (value) => {
  if (!value) return 'Belum ditentukan'

  const date = new Date(`${value}T00:00:00`)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export const loadTasks = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks))
      return defaultTasks
    }

    const parsed = JSON.parse(stored)
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks))
    return defaultTasks
  } catch (error) {
    console.error('Failed to load tasks:', error)
    return defaultTasks
  }
}

export const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const getTaskCounts = (tasks = []) => {
  const total = tasks.length
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length
  const todo = tasks.filter((task) => task.status === 'To Do').length
  const completionRate = total ? Math.round((completed / total) * 100) : 0

  return {
    total,
    completed,
    inProgress,
    todo,
    completionRate,
  }
}

export const sortByDeadline = (tasks = [], direction = 'asc') => {
  return [...tasks].sort((a, b) => {
    const diff = new Date(a.deadline) - new Date(b.deadline)
    return direction === 'asc' ? diff : -diff
  })
}

export const getUpcomingTasks = (tasks = []) => {
  return sortByDeadline(tasks, 'asc').slice(0, 3)
}
