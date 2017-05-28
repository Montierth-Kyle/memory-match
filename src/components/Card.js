import React from 'react';

const Card = ({ updateCard, flipped, matched, icon, index }) => (
  <div 
    className='col-xs-3 text-center' 
    style={{ height: '300px', border: '1px solid black'}}
    onClick={ () => updateCard(index, true) }
  >
    { (flipped || matched) && <i className={`fa ${icon} fa-5x`} /> }
  </div>
);

export default Card;