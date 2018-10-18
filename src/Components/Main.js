import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pet from './Pet';
import NotFound from './NotFound';

const Main = () => (
    <main>
        <Switch>
            <Route path='/cat' render={()=><Pet value="cats"/>} />
            <Route path='/dog' render={()=><Pet value="dogs"/>} />
            <Route component={NotFound}/>
        </Switch>
    </main>
)

export default Main
