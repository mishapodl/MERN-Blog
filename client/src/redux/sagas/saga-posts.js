import { put, call, select } from "redux-saga/effects";
import {
  fetchGetPosts,
  fetchGetComments,
  fetchSendComment,
  fetchDeleteComment
} from "../apis/index";
import {
  setErrorPosts,
  setPosts,
  setErrorComments,
  setComments,
} from "../actions/actions-posts";

const getIdPost = state => state.idPost;

export function* workGetPosts() {
  try {
    const posts = yield call(fetchGetPosts);
    yield put(setPosts(posts));
  } catch (err) {
    yield put(setErrorPosts(err));
  }
}

export function* workGetComments() {
  try {
    const idPost = yield select(getIdPost);
    const comments = yield call(fetchGetComments, idPost);
    yield put(setComments(comments));
  } catch (err) {
    yield put(setErrorComments(err));
  }
}

export function* workPostComment(comment) {
  try {
    yield call(fetchSendComment, comment);
  } catch (err) {
    yield put(setErrorComments(err));
  }
}

export function* workDeleteComment(idComment) {
  try {
    yield call(fetchDeleteComment, idComment.id);
  } catch (err) {
    yield put(setErrorComments(err));
  }
}
