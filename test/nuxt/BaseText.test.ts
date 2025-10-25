import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseText from '../../app/components/Base/Text.vue';

// Mock `cn` util since it’s just a class combiner
vi.mock('../../app/utils/cn', () => ({
  cn: (...classes: string[]) => classes.join(' '),
}));

describe('BaseText.vue', () => {
  it('renders default tag as <span>', () => {
    const wrapper = mount(BaseText, {
      slots: { default: 'Hello world' },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe('span');
    expect(wrapper.text()).toBe('Hello world');
  });

  it.each<['h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | undefined, string]>([
    ['h1', 'text-3xl font-bold'],
    ['h2', 'text-center text-3xl font-bold w-1/3'],
    ['h3', 'text-2xl font-bold'],
    ['h4', 'font-bold'],
    ['h5', 'text-lg'],
    ['h6', 'text-lg'],
    ['p', 'text-lg'],
    ['span', 'text-lg'],
  ])('renders correct tag and classes for %s', async (as, expectedClass) => {
    const wrapper = mount(BaseText, {
      props: { as },
      slots: { default: 'Test content' },
    });

    expect(wrapper.element.tagName.toLowerCase()).toBe(as);
    expect(wrapper.classes().join(' ')).toContain(expectedClass);
    expect(wrapper.text()).toBe('Test content');
  });

  it('merges user-provided class with computed class', () => {
    const wrapper = mount(BaseText, {
      props: { as: 'h3' },
      attrs: { class: 'custom-class' },
      slots: { default: 'Merged class test' },
    });

    const classAttr = wrapper.attributes('class');
    expect(classAttr).toContain('text-2xl font-bold');
    expect(classAttr).toContain('custom-class');
  });
});
