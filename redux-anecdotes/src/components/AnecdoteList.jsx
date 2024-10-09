import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      <li>
        {anecdote.content}
        </li>
        <li>
         has {anecdote.votes} votes
        <button onClick={handleClick}>vote</button>
      </li>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state) 
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)


  return (
    <div>
    <ul style={{ listStyleType: 'none' }}>
      {sortedAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(vote(anecdote.id))}
        />
      )}
    </ul>
    </div>
  )
}

export default AnecdoteList
