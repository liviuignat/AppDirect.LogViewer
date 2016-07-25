import Express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import React from 'react';
import ReactDOM from 'react-dom/server';
import {ReduxAsyncConnect, loadOnServer} from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {match} from 'react-router';
import {Provider} from 'react-redux';

import {createStore} from 'helpers/redux/createStore';
import {Html} from 'main/common/components';
import {getRoutes} from 'routes';
import ApiClient from 'ApiClient';

const app = new Express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.use(require('serve-static')(path.join(__dirname, 'static')));

app.use((req, res, next) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const history = createHistory(req.originalUrl);
  const store = createStore(history, client);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return null;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

export default app;