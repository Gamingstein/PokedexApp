import React,{useEffect, useState} from "react";
import PokemonList from "./PokemonList";
import axios from "axios"
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import "./style.css"
import Pagination from "./Pagination"
function App() {
  const [query, setQuery] = useState("")
  const [pokeList,setPokeList] = useState([])
  const [allPokeList,setAllPokeList] = useState([])
  const [currPageUrl,setCurrUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextPageUrl,setNextUrl] = useState()
  const [prevPageUrl,setPrevUrl] = useState()
  const [loading,setLoading] = useState(true)
  useEffect(() =>{
    let cancel
    setLoading(true)
    axios.get(currPageUrl,{
      cancelToken: new axios.CancelToken(c => cancel = c )
    }).then(res => {
      setLoading(false)
      setNextUrl(res.data.next)
      setPrevUrl(res.data.previous)
      setPokeList(res.data.results.map(p => p))
    })
    return () => cancel()
  },[currPageUrl])

  if (loading) {
    let cancel
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",{
      cancelToken: new axios.CancelToken(c => cancel = c )
    }).then(res => {
      setAllPokeList(res.data.results.map(p => p))
    })
    return () => cancel()
  }
  // console.log(allPokeList)
  function gotoNextPage(){
    setCurrUrl(nextPageUrl)
  }
  function gotoPrevPage(){
    setCurrUrl(prevPageUrl)
  }


  if (loading){
    return (
      <>
        <Navbar/>
        <div className="loading">
          <img src="https://www.freepnglogos.com/uploads/pokeball-png/pokeball-icon-download-icons-32.png" alt=""/>
        </div>
      </>
    );
  }
  if (query !== "") {
    return (
      <>
        <Navbar/>
        <Search func={setQuery}/>
        <PokemonList pokemon = {allPokeList.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))} />
      </>
    );
  }
  return (
    <>
      <Navbar/>
      <Search func={setQuery}/>
      <PokemonList pokemon = {pokeList} />
      <Pagination
      gotoNextPage = {nextPageUrl ? gotoNextPage : null}
      gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
