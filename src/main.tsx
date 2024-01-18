import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Card } from './card-lib/Card'
import Suit from './card-lib/types/CardSuit'
import Value from './card-lib/types/CardValue'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className='flex [&>*]:h-[5rem]'>
      essa
    <Card   suit={Suit.Clubs}   value={Value.Ace} />
      <img src='/src/assets/clubs-svgrepo-com.svg'/>
      <img src='/src/assets/diamonds-svgrepo-com.svg'/>
      <img src='/src/assets/spades-svgrepo-com.svg'/>
      <img src='/src/assets/heart-svgrepo-com.svg'/>
    </div>
  </React.StrictMode>,
)
