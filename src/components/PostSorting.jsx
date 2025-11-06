import PropTypes from 'prop-types'

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onOrderChange,
}) {
  return (
    <div>
      <label htmlFor='sortBy'>
        Sort By:
        <select
          name='sortBy'
          id='sortBy'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ marginLeft: '5px' }}
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor='sortOrder' style={{ marginLeft: '10px' }}>
        Sort Order:
        <select
          name='sortOrder'
          id='sortOrder'
          value={orderValue}
          onChange={(e) => onOrderChange(e.target.value)}
          style={{ marginLeft: '5px' }}
        >
          <option value={'ascending'}> Ascending </option>
          <option value={'descending'}> Descending </option>
        </select>
      </label>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
