import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import routes from './routes';
import reducer from '../redux/reducers';

const middleware = [ thunk ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

const AppRouter = () => {
        
    let routeItems = routes.slides
        .map((item, index) =>
            <Route key={index} path={item.path} component={item.component}/>);

    let app = routes.appRoute;    
        
    return (<Provider store={store}>
                <Router history={browserHistory}>
                    <Route path={app.path} component={app.component}>
                        <IndexRoute component={routes.titleComponent} />
                        <Route component={routes.homeComponent}>
                            {routeItems}
                        </Route>
                    </Route>
                </Router>
            </Provider>);
};

export default AppRouter;


