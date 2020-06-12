import React, {PropsWithChildren} from 'react'

interface Props {
  location: {
    state:[{
      selectedUf: string,
      selectedCity: string
    }]
  }
}


const Lista: React.FC<Props> = (props) => {
  const {selectedCity, selectedUf} = props.location.state[0];
  console.log(selectedUf+ '\t' + selectedCity)
  return (
    <header>uhuuuuu</header>
  )
}

export default Lista;