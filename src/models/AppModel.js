import { observable, computed, action } from 'mobx';
import { NotificationManager } from 'react-notifications';
import { searchBars, loadDrips, loadUser } from '../api.js';
import Drip from './DripModel.js';


export default class AppModel {
    @observable username = 'Guest';
    googleResults = [];
    savedDrips = [];
    @observable drips = [];
    @observable input = '';
    @observable loading = false;

    @computed get authenticated() {
        return this.username !== 'Guest';
    }

    @computed get savedNames() {
        return this.savedDrips.map(drip => drip.name);
    }

    constructor() {
        this.loadSavedUser();
        this.loadSavedSearch();
        this.loadSavedDrips();
    }

    @action.bound updateInput(e) {
        this.input = e.target.value;
    }

    @action.bound search(resetter) {
        if (this.input === '')
            return NotificationManager.error('', 'No search term Entered!');
        this.loading = true;
        if (!resetter)
            this.toggleInputLoader();
        searchBars(this.input).then(results => {
            this.drips = results.map(result => {
                if (this.savedNames.indexOf(result.name) !== -1) {

                    return {
                        id: this.savedDrips[this.savedNames.indexOf(result.name)].id,
                        name: result.name,
                        photoRef: result.photoRef,
                        username: this.username,
                        droppers: this.savedDrips[this.savedNames.indexOf(result.name)].droppers
                    }
                }
                return {
                    id: null,
                    name: result.name,
                    photoRef: result.photoRef,
                    username: this.username,
                    droppers: []
                }
            });
            this.loading = false;
            if (!resetter)
                this.toggleInputLoader();
        });
    }

    @action.bound saveSearch() {
        console.log('Method');
        if (this.googleResults.length > 0)
            console.log('Saving');
            sessionStorage.setItem('search', this.input);
    }

    @action toggleInputLoader() {
        this.loading ?
            document.getElementsByClassName('is-expanded')[0].className += ' is-loading' :
            document.getElementsByClassName('is-loading')[0].className = 'control is-expanded';
    }

    @action loadSavedUser() {
        this.loading = true;
        loadUser().then(user => {
            this.username = user.username;
            this.loading = false;
        });
    }

    @action loadSavedSearch() {
        const searchTerm = sessionStorage.getItem('search');
        sessionStorage.clear();

        if (searchTerm) {
            this.input = searchTerm;
            this.search(true);
        }
    }

    @action loadSavedDrips() {
        this.loading = true;
        loadDrips().then(drips => {
            this.savedDrips = drips;
            this.loading = false;
        });
    }
}

const mockResults = [
    {
        name: 'Sydney',
        photoRef: 'asdasd',
    },
    {
        name: 'New York',
        photoRef: 'asdasd',
    },
    {
        name: 'Clermont',
        photoRef: 'asdasd',
    }
];