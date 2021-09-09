const parseQueryString = (qs: string) => {
  const parsedResult = qs
    .slice(1)
    .split('&')
    .reduce((acc, qs) => {
      const [key, value] = qs.split('=');
      acc[key] = value;
      return acc;
    }, {} as any);
  return parsedResult;
};

export default parseQueryString;
