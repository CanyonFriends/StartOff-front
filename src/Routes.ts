export const homePath = '/';
export const signinPath = '/signin';
export const signupPath = '/signup';

export const profilePath = '/profile/:userId';
export const buildProfilePath = (userId: string) => `/profile/${userId}`;

export const boardPath = '/board/:board';
export const buildBoardPath = (board: string) => `/board/${board}`;

export const createPostPath = '/create/post/:board';
export const buildCreatePostPath = (board: string) => `/create/post/${board}`;

export const postPath = '/board/:board/post/:postId';
export const buildPostPath = (board: string, postId: string) => `/board/${board}/post/${postId}`;
