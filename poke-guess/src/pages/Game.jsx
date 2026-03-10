import { useEffect, useState } from "react"
import PokemonGrid from "../components/PokemonGrid"
import SearchBar from "../components/SearchBar"

function Game() {

  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState("")
  const [selectedPokemon, setSelectedPokemon] = useState([])

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

      <div className="left-panel">
        <h2>Selected Pokemon</h2>

        <PokemonGrid
          pokemon={selectedPokemon}
          onClick={toggleEliminated}
          selectable={false}
        />

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

    </div>
  )
}

export default Game