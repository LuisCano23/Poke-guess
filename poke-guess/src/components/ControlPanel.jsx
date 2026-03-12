import { FaDice, FaExchangeAlt } from "react-icons/fa";

function ControlPanel({ onRandomClick, onImportExportClick }) {
  return (
    <div className="control-panel">
      <button
        className="control-btn"
        onClick={onRandomClick}
        title="Select random Pokémon"
      >
        <FaDice size={20} />
      </button>

      <button
        className="control-btn"
        onClick={onImportExportClick}
        title="Export / Import list"
      >
        <FaExchangeAlt size={20} />
      </button>
    </div>
  );
}

export default ControlPanel;