import { when } from 'mobx';
import DripModel from '../../src/models/DripModel.js';
jest.mock('../../src/api.js');



describe('DripModel', () => {
    let model;

    beforeEach(() => {
        model = new DripModel('123', 'Sydney', 'http://', 'megaboy', ['evan', 'asa']);
    });

    test('Initializes with correct state', () => {
        expect(model).toEqual({
            id: '123', name: 'Sydney', icon: 'http://', username: 'megaboy', droppers: model.droppers, saving: false
        });
        expect(model.droppers.slice()).toEqual(['evan', 'asa']);
    });

    describe('Computed values', () => {
        test('Calculates length of droppers array from observable state', () => {
            expect(model.dropCount).toBe(2);
        });

        test('Aware of whether instance is selected or not', () => {
            expect(model.selected).toBe(false);

            model.droppers = ['evan', 'asa', 'megaboy'];

            expect(model.selected).toBe(true);
        });
    });

    describe('Actions', () => {
        test('Adds user to dropper list when action is toggled on', () => {
            expect(model.droppers.slice()).toEqual(['evan', 'asa']);
            expect(model.selected).toBe(false);
            expect(model.saving).toBe(false);

            model.toggleSelected();

            when(
                () => !model.saving,
                () => {
                    expect(model.selected).toBe(true);
                    expect(model.droppers.slice()).toEqual(['evan', 'asa', 'megaboy']);
                }
            );
        });

        test('Removes user from dropper list when action is toggled off', () => {
            expect(model.droppers.slice()).toEqual(['evan', 'asa']);
            model.droppers = ['evan', 'asa', 'megaboy'];
            expect(model.selected).toBe(true);
            expect(model.saving).toBe(false);

            model.toggleSelected();

            when(
                () => !model.saving,
                () => {
                    expect(model.selected).toBe(false);
                    expect(model.droppers.slice()).toEqual(['evan', 'asa']);
                }
            );
        });
    });
    
});