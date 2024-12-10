import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries/queries.js';

const Books = (props) => {
    const [selectedGenre, setSelectedGenre] = useState('');

    const { data, loading, error } = useQuery(ALL_BOOKS, {
        variables: { genre: selectedGenre },
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    if (!props.show) {
        return null;
    }

    const books = data.allBooks;

    const allGenres = Array.from(
        new Set(books.flatMap((book) => book.genres)),
    );

    const handleGenreClick = (genre) => {
        if (genre === selectedGenre) {
            setSelectedGenre('');
        } else {
            setSelectedGenre(genre);
        }
    };

    return (
        <div>
            <h2>Books</h2>

            <div>
                <h3>Filter by Genre</h3>
                {allGenres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => handleGenreClick(genre)}
                        style={{
                            backgroundColor: genre === selectedGenre ? 'lightblue' : '',
                        }}
                    >
                        {genre}
                    </button>
                ))}
                <button onClick={() => setSelectedGenre('')}>Clear Filter</button>
            </div>

            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
