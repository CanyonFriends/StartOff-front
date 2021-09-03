/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test-utils';
import Dropdown from '../Dropdown';

let text = '';
beforeEach(() => {
  text = '';
});

describe('Component/Molecule/Dropdown', () => {
  const items = [
    { id: '1', text: 'text1' },
    { id: '2', text: 'text2' },
    { id: '3', text: 'text3' },
    { id: '4', text: 'text4' },
    { id: '5', text: 'text5' },
  ];
  const clickItem = (id: string) => {
    text = id;
  };

  it('접혀있을 때 렌더링 테스트', () => {
    const component = render(<Dropdown placeholder="드롭다운" items={items} clickItem={clickItem} />);

    component.getByText('드롭다운');
  });

  it('펼쳐져있을 때 렌더링 테스트', () => {
    const component = render(<Dropdown placeholder="드롭다운" items={items} clickItem={clickItem} />);

    component.getByText('드롭다운');
  });

  it('펼친 후 렌더링 테스트', async () => {
    const component = render(<Dropdown placeholder="드롭다운" items={items} clickItem={clickItem} />);

    const button = component.getByText('드롭다운');
    fireEvent.click(button);
    await component.findByText(items[0].text);
    await component.findByText(items[1].text);
    await component.findByText(items[2].text);
    await component.findByText(items[3].text);
    await component.findByText(items[4].text);
  });

  it('클릭 테스트', async () => {
    const component = render(<Dropdown placeholder="드롭다운" items={items} clickItem={clickItem} />);

    const button = component.getByText('드롭다운');
    fireEvent.click(button);
    const secondItem = await component.findByText(items[1].text);
    fireEvent.click(secondItem);
    waitFor(() => {
      expect(text).toBe('2');
    });
  });

  it('클릭 시 text를 반환 할 경우', async () => {
    const component = render(<Dropdown isClickValueText placeholder="드롭다운" items={items} clickItem={clickItem} />);

    const button = component.getByText('드롭다운');
    fireEvent.click(button);
    const secondItem = await component.findByText(items[1].text);
    fireEvent.click(secondItem);
    waitFor(() => {
      expect(text).toBe('text2');
    });
  });
});
