import React, { useState } from 'react';
import './multiRangeSlider.css';
import Slider from 'react-slider';

const MultiRangeSlider = ({
  min,
  max,
  onChange
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) => {
  const [values, setValues] = useState([min, max]);
  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(newValues[0], newValues[1]);
  };
  return (
    <div style={{ background: '#fff' }}>
      <h2>Return Range</h2>
      <p>Use the slider to select a rate of return range:</p>
      <Slider
        className='slider'
        value={values}
        onChange={handleChange}
        min={min}
        max={max}
        step={1}
      />
    </div>
  );
};

export default MultiRangeSlider;
