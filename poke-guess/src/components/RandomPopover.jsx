import { useState } from "react"

function RandomPopover({ onSelect, onClose }) {

  const [amount, setAmount] = useState(10)

  const handleSelect = () => {
    if (amount < 1) return
    if (amount > 50) return
    onSelect(amount)
  }

  return (
    <div className="popover">

      <h4>Select random Pokémon</h4>

      <input
        type="number"
        min="1"
        max="50"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <div className="popover-buttons">
        <button onClick={handleSelect}>Select</button>
        <button onClick={onClose}>Cancel</button>
      </div>

    </div>
  )
}

export default RandomPopover