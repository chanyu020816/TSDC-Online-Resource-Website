import { createStore, combineReducers } from "redux";
import { selectedReducer } from "redux/reducers/selectedReducers";
import { CourseReducer } from "redux/reducers/CourseReducers";
import { KeywordReducer } from 'redux/reducers/KeywordReducers';
import { roadmapReducer } from 'redux/reducers/roadmapReducers';
import { userInfoReducer } from 'redux/reducers/userInfoReducers';
import { blogPostReducer } from 'redux/reducers/blogPostReducers';
import { searchTableReducer } from 'redux/reducers/searchTableReducers';

const reducer = combineReducers({
    keyword: KeywordReducer,
    course: CourseReducer,
    roadmap: roadmapReducer,
    userInfo: userInfoReducer,
    blogPost: blogPostReducer,
    searchTable: searchTableReducer,
    //selectedItem: selectedReducer,
    //planTags: planTagsReducer,
    //googleMap: googleMapReducer
});

const store = createStore(reducer);

export default store;
