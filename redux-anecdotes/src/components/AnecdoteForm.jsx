import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'



const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    

    dispatch(createAnecdote(content))
    dispatch(setNotification(`You added: '${content}', 10`))
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