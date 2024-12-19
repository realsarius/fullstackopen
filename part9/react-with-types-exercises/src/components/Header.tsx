import { ReactElement } from 'react';
import { HeaderProps } from '../types.ts';

const Header: (props: HeaderProps) => ReactElement = (props: HeaderProps): ReactElement => {
    const { courseName } = props;

    return (
        <h1>{courseName}</h1>
    );
};

export default Header;