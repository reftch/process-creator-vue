/* eslint-disable */

import Button from './button';
import Checkbox from './checkbox';
import Dropdown from './dropdown';
import FileExplorer from './file-explorer';
import Header from './header';
import InputField from './inputfield';
import Modal from './modal';
import ModelTree from './model-tree';
import Page from './page';
import Separator from './separator';
import Splitter from './splitter';
import Table from './table';
import Tabs from './tabs';
import Topbar from './topbar';

const components: any = {
  pButton: Button,
  pCheckbox: Checkbox,
  pDropdown: Dropdown,
  pFileExplorer: FileExplorer,
  pHeader: Header,
  pInputField: InputField,
  pModal: Modal,
  pModelTree: ModelTree,
  pPage: Page,
  pSeparator: Separator,
  pSplitter: Splitter,
  pTable: Table,
  pTabs: Tabs,
  pTopbar: Topbar,
}

const creatorWidgets = {
  install(Vue: any, options = {}) {
    console.log(`Loading Compart's Vue.js Widgets Library, v${process.env.VUE_APP_VERSION}`)
    Object.keys(components).forEach(key => {
      Vue.component(key, components[key]);
    });
  }
};

export default creatorWidgets;

