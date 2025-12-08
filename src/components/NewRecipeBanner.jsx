import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function NewRecipeBanner({ recipe, onViewBanner }) {
  if (!recipe) return null

  return (
    <div className='recipe-banner'>
      <p className='recipe-msg'>
        A new recipe for {recipe.title} was just added by{' '}
        <User id={recipe.author} />!
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
