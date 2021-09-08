import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BoardTemplate from './template';
import { BoardClientType } from '../../@types/client';
import { getPostsAPI } from '../../api/post';
import { isFailed } from '../../api/error';

interface ParamProps {
  board: string;
  page: string;
}

function Board() {
  const { board, page } = useParams<ParamProps>();
  const [boardInfo, setBoardInfo] = useState<BoardClientType>();

  useEffect(() => {
    getPosts();
  }, [page]);

  const getPosts = async () => {
    const LIMIT = 10;
    const response = await getPostsAPI(Number(page), LIMIT, board);
    if (isFailed<BoardClientType>(response)) {
      return;
    }
    setBoardInfo(response);
  };

  return boardInfo ? <BoardTemplate posts={boardInfo.content} board={board} /> : <></>;
}

export default Board;
