import React, { useState } from 'react';
import Slider from 'react-slider';
import './multiRangeSlider.css';

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  title,
  description
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  title: string;
  description: string;
}) => {
  const [values, setValues] = useState([min, max]);
  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(newValues[0], newValues[1]);
  };
  return (
    <div className='slider-container'>
      <div className='slider-header'>{title}</div>
      <div className='slider-description'>{description}</div>
      <Slider
        className='slider'
        value={values}
        onChange={handleChange}
        min={min}
        max={max}
        step={1}
        withTracks={true}
        trackClassName='custom-track'
        pearling
        minDistance={1}
      />
    </div>
  );
};

export default MultiRangeSlider;
