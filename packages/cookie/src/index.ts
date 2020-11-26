import assign from './assign'
import defaultConverter from './converter'

export interface converterType {
  read?: (value:string, key?:string) => string,
  write?: (value:string, key?:string) => string,
}

export default class Cookie {
  // 创建
  static set (key, value: string, attributes) {
    if (typeof document === 'undefined') {
      return
    }

    attributes = assign({}, { path: '/' }, attributes)

    if (typeof attributes.expires === 'number') {
      // 把过期日期设置为expires天之后
      attributes.expires = new Date(Date.now() + attributes.expires * 864e5)
    }
    if (attributes.expires) {
      attributes.expires = attributes.expires.toUTCString()
    }

    key = encodeURIComponent(key)
        .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
        .replace(/[()]/g, escape)

    value = defaultConverter.write(value, key)

    let stringifiedAttributes = '';
    for (const attributeName in attributes) {
      if (!attributes[attributeName]) {
        continue
      }

      stringifiedAttributes += '; ' + attributeName

      if (attributes[attributeName] === true) {
        continue
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0]
    }

    return (document.cookie = key + '=' + value + stringifiedAttributes)
  }

  // 取值
  static get (key):string | undefined {
    if (typeof document === 'undefined' || (arguments.length && !key)) {
      return
    }

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all.
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    const jar = {};
    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=');
      let value = parts.slice(1).join('=');

      if (value[0] === '"') {
        value = value.slice(1, -1)
      }

      try {
        const foundKey = defaultConverter.read(parts[0]);
        jar[foundKey] = defaultConverter.read(value, foundKey)

        if (key === foundKey) {
          break
        }
      } catch (e) {}
    }

    return key ? jar[key] : jar
  }

  // 删除
  static remove(key, attributes) {
    this.set(key, '', assign({}, attributes, {expires: -1}))
  }

  // TODO:
  static withAttributes(attributes: { } = { path: '/' }) {
    // @ts-ignore
    return init(this.converter, Object.assign({}, this.attributes, attributes))
  }

  // TODO:
  static withConverter(converter: converterType = defaultConverter) {
    // @ts-ignore
    return init(Object.assign({}, this.converter, converter), this.attributes)
  }
}
