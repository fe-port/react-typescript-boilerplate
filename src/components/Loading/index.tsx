import React from 'react'
import './index.less'

interface Props {}

const dots = [...Array(6)]

const Loading: React.FC<Props> = () => {
  return (
    <div className="loading">
      {dots.map((_, ix) => (
        <div key={ix} className="loading-dot" />
      ))}
    </div>
  )
}

export default Loading
