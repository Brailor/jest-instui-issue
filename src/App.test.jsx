import React from 'react'
import Enzyme, {mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import { App } from './App'

describe("testing with jest", () => {
    beforeAll(() => {
        jest.setTimeout(15000)
      })

      afterAll(() => {
        jest.setTimeout(5000)
      })

    it('should render', () => {
        expect(() => {
            const container = mount(<App show={false}/>);
            container.setProps({show: true })
        }).not.toThrow()
    });

})
