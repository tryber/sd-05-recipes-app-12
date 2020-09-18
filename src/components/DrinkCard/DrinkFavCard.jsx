import React from 'react';

const DrinkFavCard = () => {
  return ( 
    <>
  <span data-testid={`${index}-horizontal-top-text`}></span>
  <span data-testid={`${index}-horizontal-name`}></span>
  <span data-testid={`${index}-horizontal-done-date`}></span>
  <span data-testid={`${index}-${tagName}-horizontal-tag`}></span>
  <img data-testid={`${index}-horizontal-share-btn`} src="" alt=""/>
  </>
);
}

export default DrinkFavCard;
