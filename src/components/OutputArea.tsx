interface OutputAreaProps {
  isLoading: boolean;
  content: string | null;
  error: string | null;
}

export default function OutputArea({ isLoading, content, error }: OutputAreaProps) {
  if (!isLoading && !content && !error) {
    return null;
  }

  return (
    <div className="output-area">
      {isLoading && (
        <div className="output-loading">
          <div className="spinner" />
          <span>Generating postmortem report...</span>
        </div>
      )}

      {error && (
        <div className="output-content" style={{ color: '#fc8181' }}>
          Error: {error}
        </div>
      )}

      {content && !isLoading && (
        <div className="output-content">{content}</div>
      )}
    </div>
  );
}
