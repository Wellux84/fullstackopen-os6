import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const handleVote = () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted: '${anecdote.content}'`, 10))
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  return (
    <div style={style}>
      <li>
        {anecdote.content}
      </li>
      <li>
        has {anecdote.votes} votes
        <button onClick={handleVote}>vote</button>
      </li>
    </div>
  )
}

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const sortedAnecdotes = [...anecdotes]
  .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  .sort((a, b) => b.votes - a.votes)

  return (
    <div>
    <ul style={{ listStyleType: 'none' }}>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </ul>
    </div>
  )
}

export default AnecdoteList
