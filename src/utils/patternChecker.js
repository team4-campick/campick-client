const patternChecker = (style, bingoPattern) => {
  return bingoPattern.map((e, i) => {
    if (e === 1) {
      return (
        <div
          className={`${style.bingoPattern} ${style[`bingoPattern${i + 1}`]}`}
          key={i}
        ></div>
      );
    }
    return null; // Ensure non-matching cases return null
  });
};

export default patternChecker;
