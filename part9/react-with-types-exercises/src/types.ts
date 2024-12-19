export interface TotalProps {
    courseParts: Array<{ id: number, name: string, exerciseCount: number }>;
}

export interface HeaderProps {
    courseName: string;
}

export interface ContentProps {
    courseParts: Array<{ id: number, name: string, exerciseCount: number }>;
}

interface CoursePartBase {
    id: number;
    name: string;
    exerciseCount: number;
}

export interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: 'basic';
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: 'group';
}

export interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: 'background';
}

export interface CoursePartSpecial extends CoursePartBase {
    description: string;
    requirements: string[];
    kind: 'special';
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;