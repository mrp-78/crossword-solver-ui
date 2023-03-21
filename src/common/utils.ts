export function getQueriedUrl(url: string, parameters:Record<string, string|number>) {
  const getDelimiter = (currentUrl: string) => (currentUrl.includes('?') ? '&' : '?');
  return Object.keys(parameters).reduce(
    (queriedUrl, parameter) =>
      parameters[parameter] ? `${queriedUrl}${getDelimiter(queriedUrl)}${parameter}=${parameters[parameter]}` : queriedUrl,
    url,
  );
}


export function getBackendServer() {
  return '';
}
