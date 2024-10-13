import { useQuery, useMutation, useQueryClient  } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useNotification } from '../components/NotificationReducer'

const Anecdotes = () => {

    const queryClient = useQueryClient()
    const [notification, dispatch] = useNotification()

    const { data, error, isError, isLoading } = useQuery({
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1,
    })
  

    const voteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
            dispatch({
              type: 'SET_NOTIFICATION',
              payload: `anecdote '${updatedAnecdote.content}' voted`
            })
            setTimeout(() => {
              dispatch({ type: 'CLEAR_NOTIFICATION' })
            }, 5000)
          },
        })
    
      const handleVote = (anecdote) => {
        voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
      }
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (isError) {
      return <div><h2>anecdote service not available due to problems in server</h2></div>
    }


    return (
        <div>
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
  }

    export default Anecdotes