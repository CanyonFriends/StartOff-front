export const homePath = '/';
export const signinPath = '/signin';
export const signupPath = '/signup';

export const profilePath = '/profile/:userId';
export const buildProfilePath = (userId: string) => `/profile/${userId}`;

export const boardPath = '/board/:board/:page';
export const buildBoardPath = (board: string, page: number) => `/board/${board}/${page}`;

export const createPostPath = '/create/post/:board';
export const buildCreatePostPath = (board: string) => `/create/post/${board}`;

export const postPath = '/post/:postId';
export const buildPostPath = (postId: string) => `/post/${postId}`;

export const modifyPath = '/modify/post/:postId';
export const buildModifyPath = (postId: string) => `/modify/post/${postId}`;
