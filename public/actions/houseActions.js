export function getHouseAction (listings) {
  return {
    type: 'GET_LISTINGS',
    listings
  }
}

export function singleListingAction(house) {
	return {
		type: 'SINGLE_LISTING',
		house
	}
}
