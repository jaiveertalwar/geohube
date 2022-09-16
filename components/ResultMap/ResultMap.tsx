import GoogleMapReact from 'google-map-react'
import { FC } from 'react'
import { useSelector } from 'react-redux'

import { selectUser } from '@redux/user'
import { GuessType, LocationType } from '@types'
import {
  createMarker,
  getMapTheme,
  getResultMapValues
} from '@utils/helperFunctions'

import { StyledResultMap } from './'

type Props = {
  guessedLocations: GuessType[]
  actualLocations: LocationType[]
  round: number
  isFinalResults?: boolean
}

const ResultMap: FC<Props> = ({ guessedLocations, actualLocations, round, isFinalResults }) => {
  const guessedLocation = guessedLocations[guessedLocations.length - 1]
  const actualLocation = actualLocations[round - 2]
  const user = useSelector(selectUser)
  const deafultCoords = {
    lat: 0,
    lng: 0,
  }

  const lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2,
  }

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  const GoogleMapConfig = {
    key: googleKey,
  }

  const handleApiLoaded = () => {
    const { center, zoom } = getResultMapValues(guessedLocation, actualLocation, isFinalResults)
    const map = new window.google.maps.Map(document.getElementById('resultMap') as HTMLElement, {
      zoom: zoom,
      center: center,
      disableDefaultUI: true,
      styles: getMapTheme(''),
      clickableIcons: false,
    })

    // If this is final results map, load all the round markers. Otherwise, simply load the current round markers
    if (isFinalResults) {
      for (let i = 0; i < actualLocations.length; i++) {
        createMarker(guessedLocations[i], map, `/images/markers/testMarker2.png`)
        const actualLocationMarker = createMarker(actualLocations[i], map, `/images/markers/actualMarker${i + 1}.png`)

        actualLocationMarker.addListener('click', () => {
          window.open(
            `http://www.google.com/maps?layer=c&cbll=${actualLocations[i].lat},${actualLocations[i].lng}`,
            '_blank'
          )
        })

        new google.maps.Polyline({
          path: [guessedLocations[i], actualLocations[i]],
          map: map,
          strokeOpacity: 0,
          icons: [{ icon: lineSymbol, offset: '0', repeat: '10px' }],
        })
      }
    } else {
      createMarker(guessedLocation, map, `/images/markers/testMarker2.png`)
      const actualLocationMarker = createMarker(actualLocation, map, '/images/markers/actualMarker.png')

      actualLocationMarker.addListener('click', () => {
        window.open(`http://www.google.com/maps?layer=c&cbll=${actualLocation.lat},${actualLocation.lng}`, '_blank')
      })

      new google.maps.Polyline({
        path: [guessedLocation, actualLocation],
        map: map,
        strokeOpacity: 0,
        icons: [{ icon: lineSymbol, offset: '0', repeat: '10px' }],
      })
    }
  }

  const onInit = (map: any, maps: any) => {}

  return (
    <StyledResultMap>
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={GoogleMapConfig}
          defaultCenter={deafultCoords}
          zoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => onInit(map, maps)}
          //onClick={(e) => addMarker(e)}
          options={{
            styles: getMapTheme('Light'),
            clickableIcons: false,
          }}
        ></GoogleMapReact>
      </div>
    </StyledResultMap>
  )
}

export default ResultMap
