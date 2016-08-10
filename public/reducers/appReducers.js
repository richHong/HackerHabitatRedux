import { combineReducers } from 'redux';
import getHouseReducer from '../reducers/houseReducer';

var houseListingReducer = combineReducers({
	listings: getHouseReducer
});

export default houseListingReducer;
