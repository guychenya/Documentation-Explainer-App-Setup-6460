import React from 'react';
import * as FiIcons from 'react-icons/fi';
import { FiAlertTriangle } from 'react-icons/fi';

const SafeIcon = ({ icon, name, ...props }) => {
  let IconComponent;
  
  try {
    // If icon is passed directly, use it
    if (icon) {
      IconComponent = icon;
    } 
    // If name is passed, try to find it in FiIcons
    else if (name && FiIcons[name]) {
      IconComponent = FiIcons[name];
    }
    // If name starts with Fi, try it as is
    else if (name && FiIcons[`Fi${name}`]) {
      IconComponent = FiIcons[`Fi${name}`];
    }
    else {
      IconComponent = null;
    }
  } catch (e) {
    IconComponent = null;
  }
  
  return IconComponent ? React.createElement(IconComponent, props) : <FiAlertTriangle {...props} />;
};

export default SafeIcon;