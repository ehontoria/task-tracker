
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function root_init(node) {
    let tasks = window.tasks;
    ReactDOM.render(<Root tasks={tasks} />, node);
}

class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: props.tasks,
            users: [],
            // currentUser: [],
        };
    }

    fetch_tasks() {
        $.ajax("/api/v1/tasks", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: (resp) => {
                let tempState = _.assign({}, this.state, { tasks: resp.data });
                this.setState(tempState);
            }
        })
    }

    fetch_users() {
        $.ajax("/api/v1/users", {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: "",
            success: (resp) => {
                let tempState = _.assign({}, this.state, { users: resp.data });
                this.setState(tempState);
            }
        })
    }

    render() {
        return <div>
            <Router>
            <div>
                    <Header root={this} />
                    <Route path="/" exact={true} render={() =>
                        <TaskList root={this} tasks={this.state.tasks} />
                    } />
                    <Route path="/users" exact={true} render={() =>
                        <UserList users={this.state.users} />
                    } />
                    <Route path="/users/new" exact={true} render={() =>
                        <Register/>
                    } />
                </div>
            </Router>
        </div>
    }
}
/**
 * <Router>
                <div>
                    <Header root={this} />
                    <Route path="/" exact={true} render={() =>
                        <TaskList tasks={this.state.tasks} />
                    } />
                </div>
            </Router>
 * 
 *                     <Route path="/users" exact={true} render={() =>
                        <UserList users={this.state.users} />
                    } />
 * 
 * <%= if @current_user do %>
              <p>
                User: <%= @current_user.name %> |
                <%= link("Sign out", to: Routes.session_path(@conn, :delete), method: :delete) %>
              </p>
              <% else %>
                <%= form_for @conn, Routes.session_path(@conn, :create),
                      [class: "form-inline"], fn f -> %>
                <%= text_input f, :name, class: "form-control" %>
                <%= submit "Sign in", class: "btn btn-secondary"%>
                | <%= link "Register", to: Routes.user_path(@conn, :new) %>
              <% end %>
            <% end %>
 */

function Header(props) {
    let {root} = props;
    return <div className="col-12">
        <h1>Welcome to Task Tracker</h1>
        <nav role="nav navbar">
            <h1><Link to={"/"}>Home</Link></h1>
            <h1><Link to={"/users/new"}>Register</Link></h1>
          <div>
            <input type="user" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-secondary">Sign in</button>
          </div>
        </nav>
    </div>
}

function TaskList(props) {
    let tasks = _.map(props.tasks, (task) => <Task key={task.id} task={task} root={props.root}/>);
    return <div className="row">
        {tasks}
    </div>
}

function Task(props) {
    let task = props.task;
    let root = props.root;
    let user = root.state.users;
    console.log(root);
    return <div className="col-12">
        <p>{task.name}</p>
        <p>{task.done}</p>
        <p>{task.minutes_spent}</p>
    </div>
}