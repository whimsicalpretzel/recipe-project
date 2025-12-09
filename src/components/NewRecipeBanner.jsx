import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function NewRecipeBanner({ recipe, onViewBanner }) {
  if (!recipe) return null

  return (
    <div className='recipe-banner'>
      <p className='recipe-msg'>
        A new recipe for{' '}
        <span className='banner-recipe-title'>{recipe.title}</span> was just
        added by{' '}
        <span className='user-id-banner'>
          <User id={recipe.author} />
        </span>
        !
      </p>
      <button
        className='see-new-recipe-btn'
        onClick={() => onViewBanner(recipe)}
      >
        See this recipe!
      </button>
    </div>
  )
}

NewRecipeBanner.propTypes = {
  recipe: PropTypes.object,
  onViewBanner: PropTypes.func,
}
