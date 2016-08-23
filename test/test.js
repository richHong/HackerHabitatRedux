import expect from 'expect';
import * as actions from '../public/actions/houseActions';

describe('actions', () => {
  it('should create an action to add a todo', () => {
    const listings = 'listing test';
    const expectedAction = {
      type: 'GET_LISTINGS',
      listings
    };
    expect(actions.getHouseAction(listings)).toEqual(expectedAction);
  });
});
