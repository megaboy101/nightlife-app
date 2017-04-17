const mockGoogleResults = [
    { name: 'Sydney', icon: 'asdfasdf' },
    { name: 'Melbourne', icon: 'asdfasdf' },
    { name: 'Destined', icon: 'asdfasdf' }
];

const mockSavedDrips = [
    { id: 'asdferw203423qwedn23', name: 'Sydney', droppers: ['megaboy'] },
    { id: '2938dj2039r2dfaqf3e3', name: 'Colorado', droppers: ['evan', 'megaboy'] },
    { id: 'd0i3d2nd02i3nd02ndks', name: 'New York', droppers: ['evan', 'megaboy'] }
];

export function searchBars(searchTerm) {
    return new Promise((resolve, reject) => {
        if (false)
            reject();

        process.nextTick(() => {
            resolve(mockGoogleResults);
        });
    });
}

export function loadDrips() {
    return new Promise((resolve, reject) => {
        if (false)
            reject();
        
        process.nextTick(() => {
            resolve(mockSavedDrips);
        });
    });
}

export function loadUser() {
    return new Promise((resolve, reject) => {
        if (false)
            reject();
            
        process.nextTick(() => {
            resolve({username: 'megaboy'});
        });
    });
}

export function saveDrip(name, dropper) {
    return new Promise((resolve, reject) => {
        if (false)
            reject();
        
        process.nextTick(() => {
            resolve();
        });
    });
}

export function addDropper(id, dropper) {
    return new Promise((resolve, reject) => {
        if (false)
            reject();
        
        process.nextTick(() => {
            resolve();
        });
    });
}

export function removeDropper(id, dropper) {
    return new Promise((resolve, reject) => {
        if (false)
            reject();
        
        process.nextTick(() => {
            resolve();
        });
    });
}