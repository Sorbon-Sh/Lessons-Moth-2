const useTruncate = () => {
  const truncate = (str: string, n: number) => {
    if (str.length <= n) {
      return str;
    } else {
      return str.slice(0, n - 1) + "...";
    }
  };

  return truncate;
};

export default useTruncate;
