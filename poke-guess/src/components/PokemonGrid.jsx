import PokemonCard from "./PokemonCard"

function PokemonGrid({ pokemon, onClick, selectable }) {

  return (
    <div className="grid">

      {pokemon.map(p => (

        <PokemonCard
          key={p.id}
          pokemon={p}
          onClick={onClick}
          selectable={selectable}
        />

      ))}

    </div>
  )
}

export default PokemonGrid