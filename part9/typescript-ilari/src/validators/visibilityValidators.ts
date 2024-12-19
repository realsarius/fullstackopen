import { isString } from './commentValidators';
import { Visibility } from '../types';

const isVisibility = (param: string): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param);
};

export const parseVisibility = (visibility: unknown): Visibility => {
    if (!isString(visibility) || !isVisibility(visibility)) {
        throw new Error('Incorrect visibility: ' + visibility);
    }
    return visibility;
};