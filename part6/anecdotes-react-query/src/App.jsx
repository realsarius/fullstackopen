import AnecdoteForm from './components/AnecdoteForm.jsx';
import AnecdoteList from './components/AnecdoteList.jsx';
import Title from './components/Title.jsx';
import Notification from './components/Notification.jsx';

const App = () => {

    return (
        <div>
            <Title text={'Anecdotes'} />
            <Notification />
            <AnecdoteForm />
            <AnecdoteList />
        </div>
    );
};

export default App;