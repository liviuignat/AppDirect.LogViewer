import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {AppContainer} from 'main/common/components';
import {NotFoundPage} from 'main/common/pages';
import {HomePage} from 'main/home/pages';

export function getRoutes() {
  return (
    <Route path="/" component={AppContainer}>
      <IndexRoute component={HomePage} />

      <Route path="*" component={NotFoundPage} status={404} />
    </Route>
  );
}
