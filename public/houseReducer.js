var getHouseReducer = function(state = {
  searchResults:[],
  singleListing: null
}, action){
  switch (action.type) {
    case 'GET_LISTINGS':
      return Object.assign({}, state, {
        searchResults: action.listings
      });
    case 'SINGLE_LISTING':
    	return Object.assign({}, state, {
        singleListing: action.house
      });
    default:
      return state;
  };
};

export default getHouseReducer