import Switch from 'react-switch';
import React from 'react';

function ToggleSwitch({
  checked,
  onChange
}: {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      checkedIcon={false}
      uncheckedIcon={false}
      handleDiameter={24}
      offColor='#D5DFE7'
      offHandleColor='#6F869B'
      onColor='#E0E4FF'
      onHandleColor='#6853E8'
      draggable={true}
      className={'archived-switch'}
    />
  );
}

export default ToggleSwitch;
