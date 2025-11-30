import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [newArtist, setNewArtist] = useState('')

  return (
    <>
      <h1>Some Artdatabase</h1>
      <div className="card">
        <h4>Find an artist:</h4>
        <p>Artist name: <input value={newArtist} onChange={e => setNewArtist(e.target.value)}/></p>
        <p>I will generate more information about {newArtist} soon! In the meantime, you can ask google.</p>
        <a href={`https://www.google.com/search?q=${newArtist.replaceAll(' ', '+')}`} target='blank'>
          Google {newArtist}
        </a>
      </div>
      <p className="read-the-docs">
        &#169; by Clemens Leopold
      </p>
    </>
  )
}

export default App
