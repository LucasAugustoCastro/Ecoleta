import React from 'react';

import './styles.css';

interface Props {
  actived: boolean;

}

const Search: React.FC<Props> = ({actived, children}) => {
  return actived ?( 
    <div className= 'container'> 
      {children}
    </div>
    
  ): null;
}


export default Search;