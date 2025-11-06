import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>
        {field}:
        <input
          type='text'
          name={`filter-${field}`}
          id={`filter-${field}`}
          value={value}
          style={{ marginLeft: '5px' }}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
