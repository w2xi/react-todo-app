import React from 'react'
import '../styles/todos.css'

class ToDo extends React.Component
{
  constructor(props){
    super(props)

    this.state = {
      input: '',
      todos: [],
      currentAction: 'all',
      actions: [
        { id: 1, action: 'All', active: true },
        { id: 2, action: 'Active', active: false },
        { id: 3, action: 'Completed', active: false }
      ]
    }
  }

  onInputChange(event){
    this.setState({
      input: event.target.value
    })
  }

  handleEnterKey(event){
    if ( event.code === 'Enter' ){
      this.handleSubmit()
    }
  }

  handleSubmit(){
    let input = this.state.input.trim()

    if ( input.length > 0 ){
      const newItem = {
        id: Date.now(),
        content: input,
      }
  
      this.setState(prevState => ({
        todos: prevState.todos.concat(newItem),
      }))
    }

    this.setState({ input: '' })
  }

  handleClickAction(id){
    this.state.actions.forEach(item => {
      item.active = item.id === id
    })

    const actionItem = this.state.actions.find(item => item.id === id)
    const actionName = actionItem.action.toLowerCase()

    this.setState({
      currentAction: actionName
    })
  }

  handleClickCheckbox(id){
    this.state.todos.forEach(item => {
      if ( item.id === id ){
        item.done = !item.done
      } 
    })

    this.setState({})
  }

  componentDidMount(){
    document.getElementById('input').focus()
  }

  render(){
    let filterCallback = null

    switch (this.state.currentAction){
      case 'all':
        filterCallback = item => item
        break;
      case 'active':
        filterCallback = item => !item.done
        break;
      case 'completed':
        filterCallback = item => item.done
        break;
    }

    const todoList = this.state.todos.filter(filterCallback).map(todo => {
      
      return (
        <li className="todo-app-item" key={todo.id}>
          <label className="todo-app-item-label">
            <input type="checkbox" onChange={this.handleClickCheckbox.bind(this, todo.id)} className="todo-app-item-checkbox" checked={!!todo.done} />
            <span className={["todo-app-item-content", todo.done ? " checked" : ''].join('')}>{ todo.content }</span>
          </label>
        </li>
      )
    })

    const appList = todoList.length ? 
        <ul>{ todoList }</ul> : <div className="todo-app-list-no-items">There are no items.</div>

    const actionsList = this.state.actions.map(item => (
      <li 
        className={["todo-app-action-item", item.active ? 'active' : ''].join(' ')} 
        onClick={this.handleClickAction.bind(this, item.id)} 
        key={item.id}
      >
        { item.action }
      </li>
    ))

    return (
      <div className="todo-app">
        <h1 className="todo-app-title">TO DO APP</h1>
        <div className="todo-app-main">
          <div className="todo-app-input">
            <input 
              id="input"
              value={this.state.input} 
              onChange={this.onInputChange.bind(this)} 
              onKeyPress={this.handleEnterKey.bind(this)}
              placeholder="请输入内容" />
          </div>
          <div className="todo-app-list">
            { appList }
          </div>
        </div>
        <div className="todo-app-footer">
          <div className="todo-app-list-num">
            { todoList.length } items
          </div>
          <ul className="todo-app-actions">
            { actionsList }
          </ul>
        </div>
      </div>
    )
  }
}

export default ToDo