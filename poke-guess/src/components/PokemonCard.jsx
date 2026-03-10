function PokemonCard({ pokemon, onClick, selectable }) {

  const sprite =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`

  const className =
    pokemon.eliminated ? "card eliminated" : "card"

  const handleClick = () => {
    if (selectable) {
      // grilla derecha → agregar pokemon
      onClick(pokemon)
    } else {
      // grilla izquierda → toggle gris
      onClick(pokemon.id)
    }
  }

  return (
    <div className={className} onClick={handleClick}>
      <img src={sprite} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  )
}

export default PokemonCard