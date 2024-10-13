import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import { useNotification } from '../components/NotificationReducer'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useNotification()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `anecdote '${newAnecdote.content}' has added!`
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'error at new anecdote'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')

    if (content.length < 5) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more'
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return
    }

    newAnecdoteMutation.mutate({ content, votes: 0 })

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
