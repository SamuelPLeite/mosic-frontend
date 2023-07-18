import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const TrackButton = ({ onChange }) => {
  const [isSong, setIsSong] = useState(true)

  const handleChange = (event, newState) => {
    if (newState !== null) {
      setIsSong(newState)
      onChange(newState)
    }
  }

  return (
    < ToggleButtonGroup
      value={isSong}
      exclusive
      onChange={handleChange}
      aria-label="track or album"
    >
      <ToggleButton value={true} aria-label="track">
        Track
      </ToggleButton>
      <ToggleButton value={false} aria-label="album">
        Album
      </ToggleButton>
    </ToggleButtonGroup >)
}

export default TrackButton