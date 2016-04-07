'use strict';
// import '../node_modules/bootstrap/scss/bootstrap.scss';
import './styles/main.scss';
import sub from './sub';
import $ from 'jquery';
import moment from 'moment';
import Promise from 'bluebird';
import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
    constructor(){
        super();
    }

    render(){
        //JSX here
        return (
            <div className="container">
                <section className="jumbotron">
                    <h3 className="jumbotron-heading">
                        Search Github Users xxTxx B
                    </h3>
                </section>
            </div>
        )
    }
}

const app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) =>{
    $('body').append('<p>promise result is ' + number + ' now is '+ moment().format() + '</p>');
});
document.body.appendChild(app);
// app.appendChild(sub());
ReactDOM.render(<App />, app);
