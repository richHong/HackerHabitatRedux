import { combineReducers } from 'redux';
import getHouseReducer from './houseReducer';

var houseListingReducer = combineReducers({
	listings: getHouseReducer
});

export default houseListingReducer;
