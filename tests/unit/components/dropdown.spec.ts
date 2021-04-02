import { shallowMount } from '@vue/test-utils'
import dropdown from '@/components/dropdown/dropdown.vue'

describe('dropdwon.vue', () => {
  it('renders basic', () => {
    const wrapper = shallowMount(dropdown, {
      props: {
        modelValue: 'Deutsch',
        options: ['English', 'Deutsch', 'Français']
      }
    })

    expect(wrapper.find('.dropdown-options').exists()).toBe(true)
    expect(wrapper.find('.dropdown-select-trigger').html())
      .toEqual('<div class="dropdown-select-trigger"><span>Deutsch</span><div class="dropdown-arrow open"></div></div>');
  })

  it('renders disabled dropdown', () => {
    const wrapper = shallowMount(dropdown, {
      props: {
        modelValue: 'Deutsch',
        options: ['English', 'Deutsch', 'Français'],
        disabled: true
      }
    })

    expect(wrapper.find('.dropdown-options').exists()).toBe(false)
  })
})
