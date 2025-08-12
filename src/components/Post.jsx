import PropTypes from 'prop-types' // Note: capital P in PropTypes

export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

// Fixed: PropTypes (not PropTypes) and should be propTypes (lowercase p)
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}
