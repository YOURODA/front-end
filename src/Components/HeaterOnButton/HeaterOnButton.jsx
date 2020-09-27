import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function HeaterOnButton() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  console.log('checked', checked);
  return (
    <div>
      Test
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        label="Heater On"
      />
    </div>
  );
}

export default HeaterOnButton;
