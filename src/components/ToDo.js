import React from 'react'
import '../styles/todos.css'

class ToDo extends React.Component
{
  constructor(props){
    super(props)

    this.state = {
      input: '',
      todos: [],
    }
  }

  onInputChange(event){
    const input = event.target.value

    this.setState({
      input,
    })
  }

  handleSubmit(){
    this.setState(prevState => ({
      todos: prevState.todos.concat([{
        content: prevState.input,
        done: false,
      }])
    }))

    this.setState({
      input: '',
    })
  }

  handleClickToDoItem(todo){

  }

  render(){
    const todoList = []
    const doneList = []

    this.state.todos.forEach((todo, index) => {
      const elem = <li className="todo-item" onClick={this.handleClickToDoItem.bind(this)} key={index}>{ todo.content }</li>

      if ( todo.done ){
        doneList.push(elem)
      }else {
        todoList.push(elem)
      }
    })

    return (
      <div className="todo-container">
        <div className="todo-input">
          <input value={this.state.input} onChange={this.onInputChange.bind(this)} placeholder="请输入内容" />
          <button onClick={this.handleSubmit.bind(this)}>提交</button>
        </div>
        <div className="todo-list">
          <ul>
            { todoList }
          </ul>
        </div>
        <div className="todo-done">
          <ul>
            { doneList }
          </ul>
        </div>
      </div>
    )
  }
}

export default ToDo