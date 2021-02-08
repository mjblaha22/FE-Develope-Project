function checkerUrl(articleUrl) {
  const check = articleUrl.match(/(http(s)?:\/\/.)?(www\.).*/);
  // if check comes back not null run second check
  if (check) {
    // check must equal original url to pass on to api
    if (check.input === articleUrl){
    return true
    } else {
      return false
    }
  } else {
    return false
  }
}

module.exports = checkerUrl
