import { observable, computed, action } from 'mobx';
import { NotificationManager } from 'react-notifications';
import { saveDrip, addDropper, removeDropper, loadSearchImage } from '../api.js';

export default class DripModel {
    id = '';
    name = '';
    photoRef = '';
    username = '';
    @observable photo = '';
    @observable droppers = [];
    @observable saving = false;
    @observable imageLoaded = false;

    constructor(id, name, photoRef, username, droppers) {
        this.id = id;
        this.name = name;
        this.photoRef = photoRef;
        this.username = username;
        this.droppers = droppers;

        this.loadImage(this.photoRef);
    }

    @computed get dropCount() {
        return this.droppers.length;
    }

    @computed get selected() {
        return this.droppers.indexOf(this.username) !== -1;
    }

    @action.bound toggleSelected() {
        if (this.username !== 'Guest') {
            this.saving = true;
            if (!this.selected) {
                this.droppers.push(this.username);
                if (this.dropCount === 1 && !this.id) {
                    saveDrip(this.name, this.username).then(newId => {
                        this.id = newId;
                        this.saving = false;
                    });
                }
                else {
                    addDropper(this.id, this.username).then(() => {
                        this.saving = false;
                    });
                }
            }
            else {
                this.droppers.splice(this.droppers.indexOf(this.username), 1);
                removeDropper(this.id, this.username).then(() => {
                    this.saving = false;
                });
            }
        }
        else {
            NotificationManager.error('', 'You must be signed in to drop on a drip!');
        }
    }

    @action loadImage(photoRef) {
        loadSearchImage(photoRef).then(imageURL => {
            this.photo = imageURL;
        });
    }

    @action.bound showImage() {
        this.imageLoaded = true;
    }
}