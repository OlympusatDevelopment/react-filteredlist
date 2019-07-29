import React from 'react';
import { shallow } from 'enzyme';

import TextItem from '../index';

describe('<TextItem />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <TextItem>
        {children}
      </TextItem>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
