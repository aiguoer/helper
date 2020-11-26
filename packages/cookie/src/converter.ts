export default {
  // 读取转换器（解码）
  read: function (value: string, key?:string):string {
    return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
  },
  // 写转换器（编码）
  write: function (value: string, key?:string):string {
    return encodeURIComponent(value).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    )
  }
}
