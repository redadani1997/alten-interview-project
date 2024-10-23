import ReactDOM from 'react-dom/client';
import MainProvider from 'scenes/main/provider/MainProvider';
import './assets/font-family/AltenProjectFont.ttf';
import './index.css';
import Main from './scenes/main/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <MainProvider>
        <Main />
    </MainProvider>,
);
