// test url string for http/https and www.
// if both are present then it will pass and run api functionality
// if not it will alert and cause a default error output to populate
function checker(articleUrl) {
  console.log(articleUrl)
  const check = articleUrl.match(/(http(s)?:\/\/.)?(www\.).*/);
  console.log(check)
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

export { checker }