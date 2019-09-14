import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pet from './Pet';
import NotFound from './NotFound';
import SendPet from './SendPet';
import Privacy from './Privacy';

const Main = () => (
    <main>
        <Switch>
            <Route path='/cat' render={()=><Pet value="cats"/>} />
            <Route path='/dog' render={()=><Pet value="dogs"/>} />
            <Route path='/send' component={SendPet} />
            <Route path='/privacy' component={Privacy} />
            <Route component={NotFound}/>
        </Switch>
    </main>
)

export default Main
