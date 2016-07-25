import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const data = `window.__data=${serialize(store.getState())};`;
    const apiUrl = `window.__API_URL__="${process.env.API_URL ? process.env.API_URL : ''}";`;
    const partner = `window.__PARTNER__="${process.env.PARTNER ? process.env.PARTNER : ''}";`;
    const init = `${data}${apiUrl}${partner}`;

    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />

          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}

          <link href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.9.0/codemirror.min.css" rel="stylesheet" type="text/css" />

          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: require('main/common/components/AppContainer/AppContainer.scss')._style}} /> : null }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: init}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
