import React from 'react';
import { mount } from 'enzyme';
import Uppy from 'uppy/lib/core';
import { Informer } from './Informer.js';

const h = React.createElement;
jest.mock('uppy/lib/plugins/Informer', () => {
  const Plugin = require('uppy/lib/core/Plugin');
  class InformerMock extends Plugin {
    constructor (uppy, opts) {
      super(uppy, opts);

      this.id = opts.id;
      this.type = 'informer';
    }

    install () {
      this.opts.onInstall();
    }

    uninstall () {
      this.opts.onUninstall();
    }
  };

  return InformerMock;
})

describe('test Informer', () => {
  it('can be mounted and unmounted', () => {
    const oninstall = jest.fn();
    const onuninstall = jest.fn();
    const uppy = new Uppy();
    const dash = mount((
      <Informer
        uppy={uppy}
        onInstall={oninstall}
        onUninstall={onuninstall}
      />
    ));

    expect(oninstall).toHaveBeenCalled();
    expect(onuninstall).not.toHaveBeenCalled();

    dash.unmount();

    expect(oninstall).toHaveBeenCalled();
    expect(onuninstall).toHaveBeenCalled();
  })
})