import React from 'react';

import TabWrapper from './TabWrapper';

export default class MainHeader extends React.Component {
  render() {
    return (
      <header className={'header-root-style'}>
        <div className={'header-title-root-style'}>
          <div className={'header-title-style'}>
            San Diego Bay Clinic Patient Roster
          </div>          
          <div className={'header-menu-style'}>
          <div>
            <TabWrapper label={'Home'} routePath={'/'}/>
            <TabWrapper label={'IM'} routePath={'/IM'}/>
          </div>
          </div>  
        </div>
      </header>
    );
  }
}
