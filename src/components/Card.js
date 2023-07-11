import React, { useState, useEffect } from 'react'
import axios from "axios"

export default function Card({ key, pokemonName }) {
    const [pokemon, setPokemon] = useState()
    let pokeName = String(pokemonName)
    useEffect(() => {
        axios.get(pokeName).then(res => {
            // console.log(res.data)
            setPokemon(res.data)
        })
    }, [pokeName])
    let a = {
        "id": null,
        "sprites": {
            "front_default":null,
            "other": {
                "home": {
                    "front_default": null
                },
                "official-artwork":{
                    "front_default": null
                }
            }
        },
        "name": null,
        "stats": {
            0: {
                "base_stat": null
            },
            1: {
                "base_stat": null
            },
            2: {
                "base_stat": null
            }
        },
        "types": [
            {
              "type": {
                "name": null
              }
            }
          ],
        "weight":null,
        "base_experience":null
    }
    if (pokemon) {
        a = pokemon
    }
    let imgSrc = a.sprites.other.home.front_default
    if (imgSrc === null){
        imgSrc = a.sprites.other['official-artwork'].front_default
    }
    if (imgSrc === null){
        imgSrc = a.sprites.front_default
    }
    return (
        <div className='card' key={key}>
            {a.id && <h1 className='card-number'> # {a.id}</h1>}
            {a.name && <h1 className='card-name'>{a.name}</h1>}
            {imgSrc && <img src={imgSrc} className='card-image' alt='' />}
            <div className='card-about'>Types:{a.types.map(p => (
                <span>  {p.type.name} </span>
            ))}
                <p>Weight:  {a.weight} Kg</p>
                <p>Exp: {a.base_experience}</p>
                <div className='card-stats'>
                    {a.stats[0].base_stat && <span> Hp:{a.stats[0].base_stat} </span>}
                    {a.stats[1].base_stat && <span> Attack:{a.stats[1].base_stat} </span>}
                    {a.stats[2].base_stat && <span> Defense:{a.stats[2].base_stat} </span>}
                </div>
            </div>
        </div>
    )
}
