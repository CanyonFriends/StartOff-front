import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import BoardTemplate from './template';
import { BoardClientType } from '../../@types/client';
import { getPostsAPI } from '../../api/post';
import { isFailed } from '../../api/error';
import parseQueryString from '../../utils/parseQueryString';
import { buildBoardPathWithQS } from '../../Routes';

interface ParamProps {
  board: string;
}

function Board() {
  const history = useHistory();
  const location = useLocation();
  const { board } = useParams<ParamProps>();
  const [boardInfo, setBoardInfo] = useState<BoardClientType>();
  const parsedResult = parseQueryString(location.search);

  useEffect(() => {
    getPosts();
  }, [board, location.search]);

  const getPosts = async () => {
    const response = await getPostsAPI(parsedResult.page || 0, parsedResult.size || 10, board);
    if (isFailed<BoardClientType>(response)) {
      return;
    }
    setBoardInfo(response);
  };

  const handlePagination = (pageNumber: number) => {
    history.push(buildBoardPathWithQS(board, pageNumber - 1, parsedResult.size || 10));
  };

  return boardInfo ? (
    <BoardTemplate
      posts={boardInfo.content}
      board={board}
      currentPage={(Number(parsedResult.page) || 0) + 1}
      totalPage={boardInfo.totalPages}
      handlePagination={handlePagination}
    />
  ) : (
    <></>
  );
}

export default Board;
