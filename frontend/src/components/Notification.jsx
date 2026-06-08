function Notification({ notifications, onRemove }) {
  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map(({ id, message, type }) => (
        <div key={id} className={`notification notification--${type}`}>
          <span className="notification__message">{message}</span>
          <button className="notification__close" onClick={() => onRemove(id)}>
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Notification;
