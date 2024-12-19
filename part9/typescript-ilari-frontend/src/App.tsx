import React, { useEffect, useState } from 'react';
import { DiaryEntry } from './types.ts';
import { createDiary, getAllDiaries } from './services/diaryService.ts';

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [diaryDate, setDiaryDate] = useState('');
    const [diaryWeather, setDiaryWeather] = useState('');
    const [diaryVisibility, setDiaryVisibility] = useState('');
    const [diaryComment, setDiaryComment] = useState('');
    const [error, setError] = useState<string | null>(null); // State for error message

    useEffect(() => {
        getAllDiaries().then(data => {
            setDiaries(data);
        });
    }, []);

    const noteCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        try {
            const newDiary = await createDiary({
                weather: diaryWeather,
                comment: diaryComment,
                date: diaryDate,
                visibility: diaryVisibility,
            });

            setDiaries([...diaries, newDiary]);

            // Reset fields
            setDiaryVisibility('');
            setDiaryWeather('');
            setDiaryComment('');
            setDiaryDate('');
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <h1>Add new entry</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={noteCreation}>
                <label>
                    Date:
                    <input
                        type="date"
                        value={diaryDate}
                        onChange={(event) => setDiaryDate(event.target.value)}
                    />
                </label>
                <br />

                <label>
                    Visibility:
                    <label><input type="radio" value="great" checked={diaryVisibility === 'great'}
                                  onChange={() => setDiaryVisibility('great')} /> great</label>
                    <label><input type="radio" value="good" checked={diaryVisibility === 'good'}
                                  onChange={() => setDiaryVisibility('good')} /> good</label>
                    <label><input type="radio" value="ok" checked={diaryVisibility === 'ok'}
                                  onChange={() => setDiaryVisibility('ok')} /> ok</label>
                    <label><input type="radio" value="poor" checked={diaryVisibility === 'poor'}
                                  onChange={() => setDiaryVisibility('poor')} /> poor</label>
                </label>
                <br />

                <label>
                    Weather:
                    <label><input type="radio" value="sunny" checked={diaryWeather === 'sunny'}
                                  onChange={() => setDiaryWeather('sunny')} /> sunny</label>
                    <label><input type="radio" value="rainy" checked={diaryWeather === 'rainy'}
                                  onChange={() => setDiaryWeather('rainy')} /> rainy</label>
                    <label><input type="radio" value="cloudy" checked={diaryWeather === 'cloudy'}
                                  onChange={() => setDiaryWeather('cloudy')} /> cloudy</label>
                    <label><input type="radio" value="stormy" checked={diaryWeather === 'stormy'}
                                  onChange={() => setDiaryWeather('stormy')} /> stormy</label>
                    <label><input type="radio" value="windy" checked={diaryWeather === 'windy'}
                                  onChange={() => setDiaryWeather('windy')} /> windy</label>
                </label>
                <br />

                <label>
                    Comment:
                    <input
                        type="text"
                        value={diaryComment}
                        onChange={(event) => setDiaryComment(event.target.value)}
                    />
                </label>
                <br />

                <button type="submit">Add</button>
            </form>

            <h1>Diary entries</h1>
            <ul>
                {diaries.map(diary => (
                    <li key={diary.id}>
                        <h3>{diary.date}</h3>
                        <p>Visibility: {diary.visibility}</p>
                        <p>Weather: {diary.weather}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
