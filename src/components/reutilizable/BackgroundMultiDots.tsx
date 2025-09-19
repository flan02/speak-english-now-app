import React from 'react'

type Props = {}

const BackgroundMultiDots = (props: Props) => {
  return (
    <div className="absolute inset-0 -z-50 min-w-[350px]">
      <div className="absolute inset-0 -z-50 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-thousand_points"></div>
    </div>
  )
}

export default BackgroundMultiDots