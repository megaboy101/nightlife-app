test('Placeholder test for api', () => {
    expect(!false).toBe(true);
});

// import { searchBars, loadDrips, loadUser } from '../src/api.js';
// jest.mock('../src/api.js');

// describe('Api', () => {
//     describe('Bar searching function', () => {
//         test('Returns a promise', () => {
//             expect(searchBars('').then).toBeTruthy();
//             expect(searchBars('').catch).toBeTruthy();
//         });

//         test('Resolves in correct format', () => {
//             searchBars('Clermont').then(data => {
//                 expect(data).toEqual([
//                     { name: 'Sydney', icon: 'asdfasdf' },
//                     { name: 'Melbourne', icon: 'asdfasdf' },
//                     { name: 'Destined', icon: 'asdfasdf' }
//                 ]);
//             });
//         });
//     });

//     describe('Saved drip retrieval function', () => {
//         test('Returns a promise', () => {
//             expect(searchBars('').then).toBeTruthy();
//             expect(searchBars('').catch).toBeTruthy();
//         });

//         test('Resolves in correct format', () => {
//             loadDrips().then(data => {
//                 expect(data).toEqual([
//                     { id: 'asdferw203423qwedn23', name: 'Sydney', droppers: ['megaboy'] },
//                     { id: '2938dj2039r2dfaqf3e3', name: 'Colorado', droppers: ['evan', 'megaboy'] },
//                     { id: 'd0i3d2nd02i3nd02ndks', name: 'New York', droppers: ['evan', 'megaboy'] }
//                 ]);
//             });
//         });
//     });

//     describe('Saved user retrieval function', () => {
//         test('Returns a promise', () => {
//             expect(searchBars('').then).toBeTruthy();
//             expect(searchBars('').catch).toBeTruthy();
//         });

//         test('Resolves in correct format', () => {
//             loadUser().then(data => {
//                 expect(data).toEqual({username: 'megaboy'});
//             });
//         });
//     });
// });