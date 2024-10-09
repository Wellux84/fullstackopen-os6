import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import Filter from "./components/Filter"
import Notification from "./components/Notification"

const App = () => {
  return(
    <div>
      <div><h2>Anecdotes</h2></div>
      <div><Notification />
      </div>
      <div>
        <Filter />
        </div>
      <div>
        <AnecdoteList />
      </div>
      <div>
        <AnecdoteForm />
      </div>
    </div>
  )
}

export default App
  