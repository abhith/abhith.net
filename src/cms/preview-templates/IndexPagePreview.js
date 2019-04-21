import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()

  if (data) {
    return (
      <IndexPageTemplate
        title={data.title}
      />
    )
  } else {
    return (<div>Loading...</div>)
  }
}

// image = { data.image }
// heading = { data.heading }
// subheading = { data.subheading }
// description = { data.description }
// intro = { data.intro || { blurbs: [] } }
// mainpitch = { data.mainpitch || {} }


IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default IndexPagePreview
