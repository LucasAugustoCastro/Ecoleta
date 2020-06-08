import React from 'react';

import {FiCheckCircle} from 'react-icons/fi';

import './styles.css';

interface Props {
  actived: boolean;
}

const Modal: React.FC<Props> = ({actived}) => {
  return actived ?(  
    <div className="model">
      <FiCheckCircle />
      <p>Cadastro concluído!</p>
    </div>
  ): null;
}


export default Modal;