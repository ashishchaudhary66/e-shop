import React from 'react'
import { Circles } from 'react-loader-spinner'

function Loader() {
  return (
    <Circles
        height="80"
        width="80"
        color="#4d84a9ff"
        ariaLabel="Circles-loading"
        visible={true}
    />
  )
}

export default Loader