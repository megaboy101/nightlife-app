import { observable, computed, action } from 'mobx';
import { NotificationManager } from 'react-notifications';
import { searchBars, loadDrips, loadUser } from '../api.js';
import Drip from './DripModel.js';


export default class AppModel {
    @observable username = 'Guest';
    @observable savedDrips = [];
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

    @action.bound search() {
        if (this.input === '')
            return NotificationManager.error('', 'No search term Entered!');
        this.loading = true;
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
        });
    }

    @action.bound saveSearch() {
        if (this.drips.length > 0)
            sessionStorage.setItem('search', this.input);
    }

    @action loadSavedUser() {
        loadUser().then(user => {
            this.username = user.username;
        });
    }

    @action loadSavedSearch() {
        const searchTerm = sessionStorage.getItem('search');
        sessionStorage.clear();

        if (searchTerm) {
            this.input = searchTerm;
            this.search();
        }
    }

    @action loadSavedDrips() {
        loadDrips().then(drips => {
            this.savedDrips = drips;
        });
    }
}