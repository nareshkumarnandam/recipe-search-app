import React from 'react'
import Popular from '../../components/Popular/Popular'

const Home = ({darkMode, setDarkMode}) => {
  return (
    <div>
        <Popular darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  )
}

export default Home