import React from 'react';
import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import AutomationApp from '../../pages/AutomationApp';

describe('When load the automation pages', () => {
    const wrapper = shallow(<AutomationApp />);

    test('Should render the AutomationApp', () => {

        expect(wrapper).toMatchSnapshot();
    });


});
