import React, { Component } from 'react';
import Projects from './components/Projects';
import Todos from './components/Todos';
import AddProject from './components/AddProject';
import $ from 'jquery';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: [],
      todos: []
    }
  }

  getToDos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({todos: data}, function() {
          console.log(this.state)
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.err(err)
      }
    });
  }

  getProjects() {
    this.setState({
      projects: [
        {
          id: uuid.v4(),
          title: 'Business Website',
          category: 'Web Design'
        },
        {
          id: uuid.v4(),
          title: 'Social App',
          category: 'Mobile Development'
        },
        {
          id: uuid.v4(),
          title: 'Language App',
          category: 'Mobile Development'
        }
      ]
    })
  }

  componentWillMount() {
    this.getProjects();
    this.getToDos();
  }

  componentDidMount() {
    this.getToDos();
  }

  handleAddProject(project) {
    console.log('project: ', project);
    let projects = this.state.projects;
    projects.push(project);
    this.setState({projects: projects});
  }

  handleDeleteProject(id) {
    let projects = this.state.projects;
    let index = projects.findIndex(x => x.id === id);
    projects.splice(index, 1);
    this.setState({projects: projects});
  }

  render() {
    return (
      <div className="App">
        My App

        <AddProject addProject={this.handleAddProject.bind(this)}/>
        <Projects projects={this.state.projects} onDelete={this.handleDeleteProject.bind(this)}/>
        <hr />
        <Todos todos={this.state.todos}/>
      </div>
    );
  }
}

export default App;

