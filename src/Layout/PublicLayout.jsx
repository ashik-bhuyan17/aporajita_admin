import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import LogInPage from '.././views/Account/LogInPage/LogInPage';
import PrivateLayout from './PrivateLayout';

export default function PublicLayout() {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, []);

  return (
    <div className="App" id="content">
      <Switch>
        <Route path="/login" component={LogInPage} />
        <Route path="/" component={PrivateLayout} />
      </Switch>
    </div>
  );
}
