// https://html-online.com/articles/get-url-parameters-javascript/

const getUrlVars = () => {
  const vars = {}
  window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (m, key, value) => {
      vars[key] = value
    }
  )
  return vars
}

export default getUrlVars
