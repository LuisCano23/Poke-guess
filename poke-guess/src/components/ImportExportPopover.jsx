import { useState } from "react"

function ImportExportPopover({ selectedPokemon, onImport, onClose }) {

  const [importCode, setImportCode] = useState("")

  const exportCode = selectedPokemon
    .map(p => p.id)
    .join("-")

  const copyCode = () => {
    navigator.clipboard.writeText(exportCode)
  }

  const handleImport = () => {
    if (!importCode) return

    const ids = importCode
      .split("-")
      .map(n => parseInt(n))
      .filter(n => !isNaN(n))

    onImport(ids)
  }

  return (
    <div className="popover">

      <h4>Export list</h4>

      <textarea
        readOnly
        value={exportCode}
        rows="2"
      />

      <button onClick={copyCode}>
        Copy code
      </button>

      <hr />

      <h4>Import list</h4>

      <textarea
        placeholder="Paste code here..."
        value={importCode}
        onChange={(e) => setImportCode(e.target.value)}
        rows="2"
      />

      <div className="popover-buttons">
        <button onClick={handleImport}>
          Import
        </button>

        <button onClick={onClose}>
          Cancel
        </button>
      </div>

    </div>
  )
}

export default ImportExportPopover