import React from 'react';
import * as MultiIcons from '@mui/icons-material';

const Icon = ({ 
  name, 
  size = 24, 
  className = "", 
  color = "currentColor",
  onClick,
  type = "mui", // "mui" or "symbols"
  ...props 
}) => {
  // Handle Material Symbols
  if (type === "symbols") {
    return (
      <span 
        className={`material-symbols-outlined ${className}`}
        style={{ 
          fontSize: size,
          color: color,
          cursor: onClick ? 'pointer' : 'default'
        }}
        onClick={onClick}
        {...props}
      >
        {name}
      </span>
    );
  }

  // Handle Material-UI icons
  const IconComponent = MultiIcons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Material-UI icons`);
    return null;
  }

  return (
    <IconComponent
      sx={{ 
        fontSize: size,
        color: color,
        cursor: onClick ? 'pointer' : 'default'
      }}
      className={className}
      onClick={onClick}
      {...props}
    />
  );
};

export default Icon;
