import { isString } from './commentValidators';
import { Weather } from '../types';

export const isWeather = (str: string): str is Weather => {
    return ['sunny', 'rainy', 'cloudy', 'stormy'].includes(str);
};

export const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error('Incorrect or missing weather: ' + weather);
    }
    return weather;
};
