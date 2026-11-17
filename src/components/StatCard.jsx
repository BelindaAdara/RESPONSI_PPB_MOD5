const StatCard = ({ label, value, detail, accent }) => {
  return (
    <div className="stat-card" style={{ '--accent': accent }}>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__detail">{detail}</div>
    </div>
  )
}

export default StatCard
