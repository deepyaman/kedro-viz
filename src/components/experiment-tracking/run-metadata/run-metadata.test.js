import React from 'react';
import RunMetadata from '.';
import { runs } from '../../experiment-wrapper/mock-data';
import Adapter from 'enzyme-adapter-react-16';
import { configure, mount, shallow } from 'enzyme';

configure({ adapter: new Adapter() });

const emptyRun = [
  {
    id: '',
    author: '',
    bookmark: true,
    gitSha: '',
    gitBranch: '',
    runCommand: '',
    notes: '',
    title: '',
  },
];

const twoRuns = [
  {
    id: 'run1',
    author: '',
    bookmark: true,
    gitSha: '',
    gitBranch: '',
    runCommand: '',
    notes: '',
    title: '',
  },
  {
    id: 'run2',
    author: '',
    bookmark: true,
    gitSha: '',
    gitBranch: '',
    runCommand: '',
    notes: '',
    title: '',
  },
];

describe('RunMetadata', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <RunMetadata isSingleRun={runs.length === 1 ? true : false} runs={runs} />
    );

    expect(wrapper.find('.details-metadata').length).toBe(1);
    expect(wrapper.find('.details-metadata__run').length).toBe(3);
  });

  it('renders a single-run view', () => {
    const wrapper = shallow(
      <RunMetadata
        isSingleRun={runs.slice(0, 1).length === 1 ? true : false}
        runs={runs.slice(0, 1)}
      />
    );

    expect(wrapper.find('.details-metadata').length).toBe(1);
    expect(wrapper.find('.details-metadata__run--single').length).toBe(1);
  });

  it('shows a "-" for empty values ', () => {
    const wrapper = mount(<RunMetadata isSingleRun={true} runs={emptyRun} />);
    expect(wrapper.find('.details-metadata__title').text()).toMatch('-');
  });

  it('handles show more/less button click event', () => {
    const setToggleNotes = jest.fn();
    const wrapper = mount(
      <RunMetadata
        isSingleRun={runs.slice(0, 1).length === 1 ? true : false}
        runs={runs.slice(0, 1)}
      />
    );
    const onClick = jest.spyOn(React, 'useState');
    onClick.mockImplementation((toggleNotes) => [toggleNotes, setToggleNotes]);

    expect(wrapper.find('.details-metadata__show-more').text()).toMatch(
      'Show more'
    );

    wrapper.find('.details-metadata__show-more').simulate('click');
    expect(setToggleNotes).toBeTruthy();
    expect(wrapper.find('.details-metadata__show-more').text()).toMatch(
      'Show less'
    );

    wrapper.find('.details-metadata__show-more').simulate('click');
    expect(setToggleNotes).toBeTruthy();
    expect(wrapper.find('.details-metadata__show-more').text()).toMatch(
      'Show more'
    );
  });

  it('enables the pin button when show changes is enabled ', () => {
    const wrapper = shallow(
      <RunMetadata
        enableShowChanges={true}
        isSingleRun={false}
        runs={twoRuns}
      />
    );

    expect(wrapper.find('.pipeline-menu-button__pin').length).toEqual(2);
  });
});
