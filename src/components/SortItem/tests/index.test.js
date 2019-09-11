import React from 'react';
import { shallow } from 'enzyme';

import ListRow from '../index';

describe('<ListRow />', () => {
  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <ListRow>
        {children}
      </ListRow>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
