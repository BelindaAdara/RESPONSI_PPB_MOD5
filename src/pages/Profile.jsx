const profile = {
  name: 'Belinda Adara Putri Aditya',
  nim: '21120124140164',
  group: '03',
  program: 'Teknik Komputer',
  university: 'Universitas Diponegoro',
}

const Profile = () => {
  return (
    <main className="page-content">
      <section className="profile-card">
        <div className="profile-card__header">
          <div className="profile-avatar">B</div>
          <div>
            <p className="eyebrow">Student Profile</p>
            <h1>TaskMate</h1>
          </div>
        </div>

        <div className="profile-summary">
          <p>
            TaskMate adalah aplikasi pengelolaan tugas mahasiswa yang membantu mengatur jadwal,
            prioritas, dan progres pengerjaan tugas secara cepat dan efisien.
          </p>
          <div className="version-badge">Version 1.0.0</div>
        </div>

        <div className="profile-grid">
          <div className="profile-field">
            <span>Nama</span>
            <strong>{profile.name}</strong>
          </div>
          <div className="profile-field">
            <span>NIM</span>
            <strong>{profile.nim}</strong>
          </div>
          <div className="profile-field">
            <span>Kelompok</span>
            <strong>{profile.group}</strong>
          </div>
          <div className="profile-field">
            <span>Program Studi</span>
            <strong>{profile.program}</strong>
          </div>
          <div className="profile-field full-width">
            <span>Universitas</span>
            <strong>{profile.university}</strong>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Profile
