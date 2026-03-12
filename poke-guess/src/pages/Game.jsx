import { useEffect, useState } from "react"
import PokemonGrid from "../components/PokemonGrid"
import SearchBar from "../components/SearchBar"
import ControlPanel from "../components/ControlPanel"
import RandomPopover from "../components/RandomPopover"
import ImportExportPopover from "../components/ImportExportPopover"

function Game() {

  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState([])
  const [showRandom, setShowRandom] = useState(false)
  const [showImportExport, setShowImportExport] = useState(false)

  const handleRandomClick = () => {
    setShowRandom(true)
  }

  const handleImportExportClick = () => {
    setShowImportExport(true)
  }

  const addRandomPokemon = (amount) => {

    const available = pokemonList.filter(
      p => !selectedPokemon.some(sp => sp.id === p.id)
    )

    const shuffled = [...available].sort(() => 0.5 - Math.random())

    const randomSelected = shuffled.slice(0, amount).map(p => ({
      ...p,
      eliminated: false
    }))

    setSelectedPokemon(prev => [...prev, ...randomSelected])

    setShowRandom(false)
  }

  const importPokemon = (ids) => {

    const imported = ids
      .map(id => pokemonList.find(p => p.id === id))
      .filter(Boolean)
      .map(p => ({
        ...p,
        eliminated: false
      }))

    setSelectedPokemon(imported)
    setShowImportExport(false)
  }

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
      .then(res => res.json())
      .then(data => {

        const formatted = data.results.map((p, index) => ({
          id: index + 1,
          name: p.name
        }))

        setPokemonList(formatted)
      })
  }, [])

  const filteredPokemon = pokemonList
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 60)

  const addPokemon = (pokemon) => {

    const exists = selectedPokemon.find(p => p.id === pokemon.id)

    if (!exists) {
      setSelectedPokemon([
        ...selectedPokemon,
        { ...pokemon, eliminated: false }
      ])
    }
  }

  const toggleEliminated = (id) => {

    setSelectedPokemon(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, eliminated: !p.eliminated }
          : p
      )
    )
  }

  return (
    <div className="container">

      <div className="left-section">

        <ControlPanel
          onRandomClick={handleRandomClick}
          onImportExportClick={handleImportExportClick}
        />

        <div className="left-panel">

          <h2>Selected Pokemon</h2>

          <PokemonGrid
            pokemon={selectedPokemon}
            onClick={toggleEliminated}
            selectable={false}
          />

        </div>

      </div>

      <div className="right-panel">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <PokemonGrid
          pokemon={filteredPokemon}
          onClick={addPokemon}
          selectable={true}
        />

      </div>
      {showRandom && (
        <RandomPopover
          onSelect={addRandomPokemon}
          onClose={() => setShowRandom(false)}
        />
      )}
      
      {showImportExport && (
        <ImportExportPopover
          selectedPokemon={selectedPokemon}
          onImport={importPokemon}
          onClose={() => setShowImportExport(false)}
        />
      )}

    </div>
  )
}

export default Game