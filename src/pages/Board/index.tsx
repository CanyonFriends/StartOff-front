import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import BoardTemplate from './template';
import { BoardClientType } from '../../@types/client';
import { getPostsAPI } from '../../api/post';
import { isFailed } from '../../api/error';
import parseQueryString from '../../utils/parseQueryString';

interface ParamProps {
  board: string;
  page: string;
}

function Board() {
  const location = useLocation();
  const { board, page } = useParams<ParamProps>();
  const [boardInfo, setBoardInfo] = useState<BoardClientType>();

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    const parsedResult = parseQueryString(location.search);
    const response = await getPostsAPI(parsedResult.page || 0, parsedResult.size || 10, board);
    if (isFailed<BoardClientType>(response)) {
      return;
    }
    setBoardInfo(response);
  };

  return boardInfo ? <BoardTemplate posts={boardInfo.content} board={board} totalPage={boardInfo.totalPages} /> : <></>;
}

export default Board;
