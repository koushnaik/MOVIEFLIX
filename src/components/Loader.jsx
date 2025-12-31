function Loader({ size = 56 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "4px solid rgba(255,255,255,0.15)",
        borderTopColor: "var(--accent)",
        animation: "spin 1s linear infinite",
        boxShadow: "0 0 30px rgba(56,189,248,0.35)",
      }}
    />
  );
}

export default Loader;
