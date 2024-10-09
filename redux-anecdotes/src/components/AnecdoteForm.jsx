import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(setNotification(`You added: '${content}'`))

    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
  
  return (
    <div>
      <div><h3>create new</h3></div>
    <form onSubmit={addAnecdote}>
      <div>
        <input name="anecdote" />
      </div>
      <div>
      <button type="submit">create</button>
      </div>
    </form>
    </div>
  )
}

export default AnecdoteForm