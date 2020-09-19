import React from 'react';

const DrinkFavCard = () => {
  return (
    <div>
      <span data-testid={`${index}-horizontal-top-text`}>a</span>
      <span data-testid={`${index}-horizontal-name`}>b</span>
      <span data-testid={`${index}-horizontal-done-date`}>c</span>
    < span data-testid={`${index}-${tagName}-horizontal-tag`}>d</span>
    < img data-testid= {`${ index }-horizontal-share-btn` } src="" alt=""/>
    </div>
    );
  }

export default DrinkFavCard;
