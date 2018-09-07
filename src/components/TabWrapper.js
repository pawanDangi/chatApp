import React from 'react';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

const TabWrapper = ({label, routePath, isMobile}) => {
  return (
    <span>
      <Link key={label} to={routePath}>
        <Button className={'header-button-style'} children={label} />
      </Link>
    </span>  
  )
} 

export default TabWrapper;
