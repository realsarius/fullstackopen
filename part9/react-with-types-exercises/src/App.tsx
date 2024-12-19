import Header from './components/Header.tsx';
import Content from './components/Content.tsx';
import { ReactElement } from 'react';
import Total from './components/Total.tsx';
import { CoursePart } from './types.ts';

const App: () => ReactElement = (): ReactElement => {
    const courseName = 'Half Stack application development';

    const courseParts: CoursePart[] = [
        {
            id: 1,
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
            kind: 'basic',
        },
        {
            id: 2,
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
            kind: 'group',
        },
        {
            id: 3,
            name: 'Basics of type Narrowing',
            exerciseCount: 7,
            description: 'How to go from unknown to string',
            kind: 'basic',
        },
        {
            id: 4,
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            backgroundMaterial: 'https://type-level-typescript.com/template-literal-types',
            kind: 'background',
        },
        {
            id: 5,
            name: 'TypeScript in frontend',
            exerciseCount: 10,
            description: 'a hard part',
            kind: 'basic',
        },
        {
            id: 6,
            name: 'Backend development',
            exerciseCount: 21,
            description: 'Typing the backend',
            requirements: ['nodejs', 'jest'],
            kind: 'special',
        },
    ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;