export default function ExitQuizButton({ onClick, label = "Exit Quiz" }) {
  return (
    <button
      className="border border-rose-600 text-rose-600 px-4 py-2 rounded-md hover:bg-rose-50 transition-colors font-medium"
      onClick={onClick}
    >
      {label}
    </button>
  );
}