export default function Header() {
  return (
    <header className="header">
      <div className="live-badge">
        <span className="live-dot"></span>
        AI-POWERED · POSTMORTEM GENERATOR
      </div>
      <h1 className="header-title">
        PostMortem<span className="dev">.dev</span>
      </h1>
      <p className="header-subtitle">
        Automate incident documentation for SREs & DevOps engineers
      </p>
    </header>
  );
}
