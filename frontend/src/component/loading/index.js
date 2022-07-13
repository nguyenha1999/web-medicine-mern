import "./index.scss";

export default function Index({ show }) {
  if (show) {
    return <div className="spinner"></div>;
  }
  return null;
}
