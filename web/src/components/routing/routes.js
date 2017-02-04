import App from '../app/App';
import Home from '../home/Home';
import Slide1 from '../slides/slide-1/Slide1';
import Slide2 from '../slides/slide-2/Slide2';
import Slide3 from '../slides/slide-3/Slide3';
import Slide4 from '../slides/slide-4/Slide4';
import Slide5 from '../slides/slide-5/Slide5';
import Slide6 from '../slides/slide-6/Slide6';
import Slide7 from '../slides/slide-7/Slide7';
import Slide8 from '../slides/slide-8/Slide8';
import Slide9 from '../slides/slide-9/Slide9';
import Slide10 from '../slides/slide-10/Slide10';
import Slide11 from '../slides/slide-11/Slide11';
import Slide12 from '../slides/slide-12/Slide12';
import Slide13 from '../slides/slide-13/Slide13';
import Slide14 from '../slides/slide-14/Slide14';
import Slide15 from '../slides/slide-15/Slide15';
import Slide16 from '../slides/slide-16/Slide16';
import Title from '../title/Title';

const routes = [
    { path: '/',       name : 'Home',    component : App},
    { path: 'slide-1', name : 'Difficult choise 1', component : Slide1 },
    { path: 'slide-2', name : 'Difficult choise 2', component : Slide2 },
    { path: 'slide-3', name : 'Difficult choise 3', component : Slide3 },
    { path: 'slide-4', name : 'Difficult choise 4', component : Slide4 },
    { path: 'slide-5', name : 'Options', component : Slide5 },
    { path: 'slide-6', name : 'Data Binding 1', component : Slide6 },
    { path: 'slide-7', name : 'Data Binding 2', component : Slide7 },
    { path: 'slide-8', name : 'Data Binding 3', component : Slide8 },
    { path: 'slide-9', name : 'Data Binding 4', component : Slide9 },
    { path: 'slide-10', name : 'Data Binding 5', component : Slide10 },
    { path: 'slide-11', name : 'Virtual DOM 1', component : Slide11 },
    { path: 'slide-12', name : 'Virtual DOM 2', component : Slide12 },
    { path: 'slide-13', name : 'Virtual DOM 3', component : Slide13 },
    { path: 'slide-14', name : 'Final Result', component : Slide14 },
    { path: 'slide-15', name : 'Summary', component : Slide15 },
    { path: 'slide-16', name : 'Demo', component : Slide16 }
];

const getPath = (path, nextIndex) => {
    if(path !== '/' &&
           path[0] === '/') {
               path = path.substring(1, path.length);
    }

    let route = routes.filter(item => item.path === path)[0];

    if(!route) {
        return undefined;
    }

    let index = routes.indexOf(route);
    index = nextIndex(index);
    
    return routes[index].path;
};

class Routes {

    get items() {
        return routes;
    }

    get slides() {
        return routes.filter((item, index) => index !== 0);
    }

    get homeComponent() {
        return Home;
    }

    get titleComponent() {
        return Title;
    }

    get appRoute() {
        return routes[0];
    }

    getNextPath(path) {
        return getPath(path, index => {
            index++;
        
            if(index === routes.length) {
                index = 0;
            }

            return index;
        });
    }

    getPrevtPath(path) {
        return getPath(path, index => {
            index--;
        
            if(index < 0) {
                index = routes.length - 1;
            }

            return index;
        });
    }
}

export default new Routes();