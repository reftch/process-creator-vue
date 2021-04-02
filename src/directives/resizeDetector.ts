
import elementResizeDetectorMaker  from 'element-resize-detector';
import { DirectiveBinding } from 'vue';

const erd = elementResizeDetectorMaker({
  strategy: "scroll" //<- For ultra performance.
});

const resizeDetector = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    let options = {};
    if (binding.value) {
      options = binding.value;
    }
    
    erd.listenTo(options, el, (element: HTMLElement) => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      binding.value.call('resize', { detail: { width, height } });
    })
  }
}

export default resizeDetector;