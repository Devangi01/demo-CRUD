import React from 'react'

const Image = ({source,alt}) => {
 const imageStyle = {
  height: "100px",
  width: "100px",
 }
  return (
    
    <div className="formlabel">
        <img style={imageStyle} {...{src : source, alt}} multiple={true} />
    </div>
  )
}

export default Image