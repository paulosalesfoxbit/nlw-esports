import React, { useEffect, useState } from 'react'

import CreateAdBanner from './components/CreateAdBanner'
import GameBanner, { GameBannerProps } from './components/GameBanner'

import logoImg from './assets/logo-nlw-esports.svg'
import './styles/main.css'

const URL = 'http://localhost:3333'

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`${URL}/games`)
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
      <img src={logoImg} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {
          games.map((g, i) => {
            return (<GameBanner key={`${g.id}${i}`} bannerUrl={g.bannerUrl} title={g.title} ads={g._count.ads} />)
          })
        }
      </div>

      <CreateAdBanner />
    </div>
  )
}

export default App
