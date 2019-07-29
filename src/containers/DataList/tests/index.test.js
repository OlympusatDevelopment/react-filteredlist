import React from 'react';
import { shallow } from 'enzyme';

import DataList from '../index';

describe('<DataList />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <DataList>
        {children}
      </DataList>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
