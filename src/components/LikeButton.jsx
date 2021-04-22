import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { IconContext } from 'react-icons/lib';
import { RiHeart2Line, RiHeart2Fill } from 'react-icons/ri';
import { connect } from 'react-redux'
import { addToFavorite, removeFromFavorite } from '../redux/weather/weather_action';

function LikeButton({ canLike, addToFavorite, favorites, currentLoction, removeFromFavorite, currentWeather }) {
  const [like, setLike] = useState(false)

  const onClick = () => {
    if (currentLoction) {
      if (favorites[currentLoction.Key]) {
        setLike(false)
        removeFromFavorite(currentLoction)
      }
      else {
        setLike(true)
        addToFavorite({ ...currentLoction, ...currentWeather })

      }

    }
  }
  useEffect(() => {
    if (currentLoction) {
      if (favorites[currentLoction.Key] && !like) {
        setLike(true)
      }
      else if (!favorites[currentLoction.Key] && like) {
        setLike(false)
      }

    }

  }, [currentLoction, favorites, like])


  return (
    <IconContext.Provider value={{ size: '1.3em' }}>
      <Button disabled={!canLike} onClick={onClick} variant="outline-secondary">{like ? <RiHeart2Fill /> : <RiHeart2Line />}</Button>
    </IconContext.Provider>
  )
}
const mapStateToProps = ({ weather_reducer }) => ({
  favorites: weather_reducer.favorites,
  currentLoction: weather_reducer.lastOpenLocation,
  currentWeather: weather_reducer.lastOpenWeather,

})

const mapDispatchToProps = {
  addToFavorite,
  removeFromFavorite
}



export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)