// const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyDJ96DTAQB79h21xiOmVcSqV0vd8sKF0mY&query=bars%20in%20';
// const zomatoKey = 'f15ea883ef7c569c1b4d0243b161f253';
// const url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY'
// const googleKey = 'AIzaSyDJ96DTAQB79h21xiOmVcSqV0vd8sKF0mY';

export function searchBars(searchTerm) {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/searchBars/' + searchTerm))
        .then(res => res.json())
        .then(places => {
            resolve(places.map(place => {
                let ref;
                place.photos ? ref = place.photos[0].photo_reference : ref = '';
                return {
                    name: place.name,
                    photoRef: ref
                };
            }));
        });
    });
}

export function loadSearchImage(reference) {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/searchImage/' + reference))
        .then(res => res.json())
        .then(image => {
            resolve(image.url);
        });
    });
}

export function loadDrips() {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/drips'))
        .then(res => res.json())
        .then(savedPlaces => {
            resolve(savedPlaces.map(place => {
                return {
                    id: place._id,
                    name: place.name,
                    droppers: place.droppers
                };
            }));
        });
    });
}

export function loadUser() {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/currentUser'), {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(user => {
            resolve({
                username: user.username,
                id: user._id
            });
        });
    });
}

export function saveDrip(name, dropper) {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/drips'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, dropper })
        })
        .then(res => res.json())
        .then(newId => {
            console.log(newId);
            resolve(newId);
        });
    });
}

export function addDropper(id, dropper) {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/drips/' + id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({dropper})
        }).then(() => resolve());
    });
}

export function removeDropper(id, dropper) {
    return new Promise((resolve, reject) => {
        fetch(new Request('/api/drips/' + id), {
            method: 'DELETE',
            body: JSON.stringify({dropper})
        }).then(() => resolve());
    });
}