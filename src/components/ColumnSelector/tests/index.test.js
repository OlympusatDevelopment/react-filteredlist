import React from 'react';
import { shallow } from 'enzyme';

import ColumnSelector from '../index';

describe('<ColumnSelector />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <ColumnSelector>
        {children}
      </ColumnSelector>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
