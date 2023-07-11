import React from 'react'
import Card from './components/Card'
export default function PokemonList({pokemon}) {
  return (
    <div className='pokemonList'>
        {pokemon.map(p => (
            <Card key={p.name} pokemonName={p.url}/>
        ))}
    </div>
  )
}
