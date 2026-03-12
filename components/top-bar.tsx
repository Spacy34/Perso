export function TopBar() {
  return (
    <header className="topbar">
      <div>
        <h1>Personal Life OS</h1>
        <p>Décide rapidement ce qui compte maintenant.</p>
      </div>
      <div className="topbar-actions">
        <button className="button-secondary" type="button">
          + Quick Add
        </button>
        <button className="button-primary" type="button">
          Weekly Review
        </button>
      </div>
    </header>
  );
}
