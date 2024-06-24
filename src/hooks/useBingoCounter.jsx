import { useState, useEffect } from 'react';

const useBingoCounter = (bingoArea) => {
  const [bingoCount, setBingoCount] = useState(0);

  useEffect(() => {
    // ================= 서버로 옮기는게 좋을거 같은 부분 ===========================
    const checkBingo = () => {
      const bingoPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      const isBingo = (pattern) =>
        pattern.every((index) => bingoArea[index].state === 1);
      let count = 0;
      bingoPatterns.forEach((pattern) => {
        if (isBingo(pattern)) {
          count++;
        }
      });
      setBingoCount(count);
    };
    // =======================================================================
    checkBingo();
  }, [bingoArea]);

  return bingoCount;
};

export default useBingoCounter;
