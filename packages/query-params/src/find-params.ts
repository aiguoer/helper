/**
 * 根据传入的url，获取指定的query参数
 * @param url {String} url地址
 * @param param  {String} param参数名
 */
export default function findParams(url: string, param: string) {
  if (url.indexOf('?') < 0) {
    return ''
  }
  const urlArray: Array<string> = url.split('?')
  const paramsArray: Array<string> = urlArray[1].split('&')
  let paramValue: string = ''
  paramsArray.forEach((params: string) => {
    const paramsSplit: Array<string> = params.split('=')
    const key: string = paramsSplit[0]
    if (key === param) {
      paramValue = paramsSplit[1]
    }
  })
  return paramValue
}
