import React from 'react';

const Description = ({
  shortDescription,
  longDescription
}: {
  shortDescription: string;
  longDescription: string;
}) => {
  const [displayFullDescription, setDisplayFullDescription] =
    React.useState(false);
  return displayFullDescription ? (
    <div className='col'>
      <span>{longDescription}</span>
      <br />
      {/* TODO: replace <a> with <span> or <p> and give the block the looks of a link */}
      {/* this is because with href='#', on mobile, on Read More/Less the page snaps to top */}
      <a href='#' onClick={() => setDisplayFullDescription(false)}>
        Read Less
      </a>
    </div>
  ) : (
    <div className='col'>
      <span>{shortDescription}..</span>
      {/* TODO: replace <a> with <span> or <p> and give the block the looks of a link */}
      {/* this is because with href='#', on mobile, on Read More/Less the page snaps to top */}
      <a href='#' onClick={() => setDisplayFullDescription(true)}>
        {' '}
        Read More
      </a>
    </div>
  );
};

export default Description;
