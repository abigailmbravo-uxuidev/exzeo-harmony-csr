import React from 'react';
import PropTypes from 'prop-types';
import { Uppy } from 'uppy/lib/core';
import InformerPlugin from 'uppy/lib/plugins/Informer';

const h = React.createElement;
export class Informer extends React.Component {
  componentDidMount () {
    const uppy = this.props.uppy
    const options = Object.assign(
      { id: 'react:Informer' },
      this.props,
      { target: this.container }
    );
    delete options.uppy;

    uppy.use(InformerPlugin, options);

    this.plugin = uppy.getPlugin(options.id);
  }

  componentWillUnmount () {
    const uppy = this.props.uppy;
    uppy.removePlugin(this.plugin);
  }

  render () {
    return h('div', {
      ref: (container) => {
        this.container = container;
      }
    })
  }
}

Informer.propTypes = {
  uppy: PropTypes.instanceOf(Uppy).isRequired
};
