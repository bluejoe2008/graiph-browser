export const deepEquals = (x, y) => {
  if (x && y && typeof x === 'object' && typeof y === 'object') {
    if (Object.keys(x).length !== Object.keys(y).length) return false
    return Object.keys(x).every((key) => deepEquals(x[key], y[key]))
  }
  return (x === y)
}

export const moveInArray = (fromIndex, toIndex, arr) => {
  if (!Array.isArray(arr)) return false
  if (fromIndex < 0 || fromIndex >= arr.length) return false
  if (toIndex < 0 || toIndex >= arr.length) return false

  const newArr = [].concat(arr)
  const el = arr[fromIndex]
  newArr.splice(fromIndex, 1)
  newArr.splice(toIndex, 0, el)
  return newArr
}

export const hostIsAllowed = (uri, whitelist = null) => {
  if (whitelist === '*') return true
  const urlInfo = getUrlInfo(uri)
  const hostname = urlInfo.hostname
  const hostnamePlusProtocol = urlInfo.protocol + '//' + hostname

  let whitelistedHosts = ['guides.neo4j.com', 'localhost']
  if (whitelist && whitelist !== '') {
    whitelistedHosts = whitelist.split(',')
  }
  return whitelistedHosts.indexOf(hostname) > -1 ||
    whitelistedHosts.indexOf(hostnamePlusProtocol) > -1
}

export const getUrlInfo = (url) => {
  const reURLInformation = new RegExp([
    '^(?:(https?:)//)?', // protocol
    '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
    '(/{0,1}[^?#]*)', // pathname
    '(\\?[^#]*|)', // search
    '(#.*|)$' // hash
  ].join(''))
  const match = url.match(reURLInformation)
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  }
}

export const getUrlParamValue = (name, url) => {
  if (!url) return false
  let out = []
  const re = new RegExp('[\\?&]' + name + '=([^&#]*)', 'g')
  let results
  while ((results = re.exec(url)) !== null) {
    if (results && results[1]) out.push(results[1])
  }
  if (!out.length) return undefined
  return out
}

// Epic helpers
export const put = (dispatch) => (action) => dispatch(action)