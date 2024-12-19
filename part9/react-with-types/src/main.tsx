import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
//
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


interface WelcomeProps {
    name: string;
}

const Welcome = (props: WelcomeProps): ReactElement => {
    return <h1>Hello, {props.name}</h1>;
};

createRoot(document.getElementById('root')!).render(
    <Welcome name="Sarah" />,
);