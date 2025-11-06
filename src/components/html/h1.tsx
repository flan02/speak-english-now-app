import React from 'react'

type Props = {
  title: string
}

const H1 = ({ title }: Props) => {
  return (
    <h1 className="text-xl lg:text-2xl font-bold font-geist-mono underline">{title}</h1>
  )
}

export default H1