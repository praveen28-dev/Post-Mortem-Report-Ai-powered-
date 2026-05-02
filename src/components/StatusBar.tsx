export default function StatusBar() {
  return (
    <div className="status-bar">
      <div className="status-left">
        <div className="status-model">
          <span className="status-dot" />
          <span>llama3-8b-8192</span>
        </div>
        <span className="status-divider">|</span>
        <span>Built for SREs & DevOps</span>
      </div>
      <div className="status-right">
        <span>postmortem.dev</span>
      </div>
    </div>
  );
}
