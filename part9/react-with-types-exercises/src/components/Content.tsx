import { CoursePart } from '../types.ts';
import { ReactElement } from 'react';

const Content = ({ courseParts }: { courseParts: CoursePart[] }): ReactElement => {
    return (
        <ul>
            {courseParts && courseParts.map((coursePart: CoursePart) => {
                switch (coursePart.kind) {
                    case 'basic':
                        return (
                            <li key={coursePart.id}>
                                <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                                <p><i>{coursePart.description}</i></p>
                            </li>
                        );
                    case 'group':
                        return (
                            <li key={coursePart.id}>
                                <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                                <p>project exercises {coursePart.groupProjectCount}</p>
                            </li>
                        );
                    case 'background':
                        return (
                            <li key={coursePart.id}>
                                <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                                <p><i>{coursePart.description}</i></p>
                                <p>submit to <a href={coursePart.backgroundMaterial}
                                                target={'_blank'}>{coursePart.backgroundMaterial}</a></p>
                            </li>
                        );
                    case 'special':
                        return (
                            <li key={coursePart.id}>
                                <p><b>{coursePart.name} {coursePart.exerciseCount}</b></p>
                                <p><i>{coursePart.description}</i></p>
                                <p>required skills: {coursePart.requirements && coursePart.requirements.length > 0
                                        ? coursePart.requirements.join(', ')
                                        : 'None'
                                    }
                                </p>
                            </li>

                        );
                    default:
                        return null;
                }
            })}
        </ul>
    );
};


export default Content;