import expect from 'expect';
import * as actions from '../public/actions/houseActions';

describe('actions', () => {
  it('should create an action to get listings', () => {
    const listings = 'listings test';
    const expectedListingsAction = {
      type: 'GET_LISTINGS',
      listings
    };
    expect(actions.getHouseAction(listings)).toEqual(expectedListingsAction);
  });

  it('should create an action to get a single listing', () => {
    const house = 'house test';
    const expectedHouseAction = {
      type: 'SINGLE_LISTING',
      house
    };
    expect(actions.singleListingAction(house)).toEqual(expectedHouseAction);
  });
});
