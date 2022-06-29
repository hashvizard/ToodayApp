import { combineReducers } from "redux";
import { auth } from "./auth";
import { posts } from './posts'
import { modal } from "./modal";
import {report} from "./report";
import {block} from "./block";
import {blockedUserPost} from './blockUserPost';
import {token} from './token';
import {initialPost} from './initialPost';
import {feedState} from './feedState';

const Reducers = combineReducers({
    auth,
    posts,
    modal,
    report,
    block,
    blockedUserPost,
    initialPost,
    token,
    feedState
})

export default Reducers;