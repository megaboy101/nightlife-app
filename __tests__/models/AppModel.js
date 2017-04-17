import { when } from 'mobx';
import AppModel from '../../src/models/AppModel.js';
import Drip from '../../src/models/DripModel.js';
jest.mock('../../src/api.js');

describe('AppModel', () => {
    let model;

    beforeEach(() => {
        model = new AppModel();
    });

    test('Has correct defaults', () => {
        expect(model.username).toBe('Guest');
        expect(model.googleResults.slice()).toEqual([]); // Sliced since observable arrays are not actual arrays
        expect(model.savedDrips.slice()).toEqual([]);
        expect(model.input).toEqual('');
        expect(model.loading).toBe(false);
    });

    describe('Computed values', () => {
        test('Computes if user is authenticated', () => {
            expect(model.authenticated).toBe(false);

            model.username = 'megaboy';
            expect(model.authenticated).toBe(true);
        });

        test('Computes saved drips by name in an array', () => {
            expect(model.savedNames.slice()).toEqual([]);

            model.savedDrips.push({ name: 'Sydney', id: 'asd876sdg9', droppers: ['yo'] });
            model.savedDrips.push({ name: 'Clermont', id: 'asd876sdg9', droppers: ['yo'] });
            expect(model.savedNames.slice()).toEqual(['Sydney', 'Clermont']);
        });

        test('Computes combined drips from api and database into Drip models', () => {
            expect(model.drips.slice()).toEqual([]);

            model.username = 'megaboy';
            model.googleResults.push(
                { name: 'Sydney', icon: 'asdfasdf' },
                { name: 'Clermont', icon: 'asdfasdf' },
                { name: 'New York', icon: 'asdfasdf' }
            );
            model.savedDrips.push(
                { id: 'asdferw203423qwedn23', name: 'Sydney', droppers: ['megaboy'] },
                { id: 'asdferw203423qwedn23', name: 'Colorado', droppers: ['evan', 'megaboy'] },
                { id: 'asdferw203423qwedn23', name: 'New York', droppers: ['evan', 'megaboy'] }
            );

            expect(model.drips).toEqual([
                new Drip('asdferw203423qwedn23', 'Sydney', 'asdfasdf','megaboy', ['megaboy']),
                new Drip(null, 'Clermont', 'asdfasdf','megaboy', []),
                new Drip('asdferw203423qwedn23', 'New York', 'asdfasdf','megaboy', ['evan', 'megaboy'])
            ]);
        });

        // test('Computes if any drip is currently saving', () => {
        //     const model = new AppModel();

        //     expect(model.dripSaving).toBe(false);

        //     model.googleResults.push({ id: 'asdferw203423qwedn23', name: 'Sydney', icon: 'asdfasdf' });

        //     model.drips[0].setSaving();

        //     expect(model.drips).toBe({});
        // });
    });

    describe('Actions', () => {
        
        test('Updates input', () => {
            expect(model.input).toBe('');

            model.updateInput({target: {value: 'yo'}});

            expect(model.input).toBe('yo');
        });

        test('Searches google api with input and sets googleResults observable', done => {
            expect(model.input).toBe('');
            expect(model.googleResults.slice()).toEqual([]);
            expect(model.loading).toBe(false);

            model.input = 'Clermont';

            expect(model.input).toBe('Clermont');

            model.search();

            /*  In mobx when working with async code that doesn't return any value
                (only performs side effects), use when to wait for the observable to
                change before testing */
            when(
                () => !model.loading,
                () => {
                    try {
                        expect(model.googleResults.slice()).toEqual([
                            { name: 'Sydney', icon: 'asdfasdf' },
                            { name: 'Melbourne', icon: 'asdfasdf' },
                            { name: 'Destined', icon: 'asdfasdf' }
                        ]);
                        done();
                    }
                    catch(err) {
                        done.fail(err);
                    }
                }
            );
        });

        test('Updates state with user returned from api', done => {
            expect(model.username).toBe('Guest');
            expect(model.loading).toBe(false);

            model.loadSavedUser();

            when(
                () => !model.loading,
                () => {
                    try {
                        expect(model.username).toBe('megaboy');
                        done();
                    }
                    catch(err) {
                        done.fail(err);
                    }
                }
            );
        });

        test('Updates state with saved drips returned from api', done => {
            expect(model.savedDrips.slice()).toEqual([]);
            expect(model.loading).toBe(false);

            model.loadSavedDrips();

            when(
                () => !model.loading,
                () => {
                    try {
                        expect(model.savedDrips.slice().length).toBe(3);
                        expect(model.savedDrips[0].name).toBe('Sydney');
                        expect(model.savedDrips[1].name).toBe('Colorado');
                        expect(model.savedDrips[2].name).toBe('New York');
                        done();
                    }
                    catch(err) {
                        done.fail(err);
                    }
                }
            );
        });
    });
});