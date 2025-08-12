/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}></label>
      <input
        type='text'
        name={`filter-${field}`}
        placeholder='filters'
        id={`filter-${field}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
