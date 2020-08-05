/**
 * 图片预加载
 * @param {Array} list - 图片url 集合
 * @param {Object} opt - 配置项
 * @param {Function} opt.each - 每加载完成一张图片回调函数
 * @param {Function} opt.all - 所有图片加载完成回调函数
 */
export default function lcImgPreload(list = [], opt = {}) {
  const totalLen = list.length
  let allData = []
  let loadedLength = 0
  let successNum = 0
  let failNum = 0
  let now = Date.now()

  /**
   * 加载完成回调
   * @param {String} status [success|fail] - 加载状态
   * @param {String} url - 当前图片的url
   * @param {Number} index - 当前图片下标
   * @param {Number} time - 当前图片的加载占时，单位ms
   */
  function imgLoad(status, url, index, time) {
    loadedLength++
    status === 'success' ? successNum++ : failNum++
    let totalTime = Date.now() - now
    let obj = {
      status: status,
      index: index,
      url: url,
      time: time,
    }
    let speed = {
      success: successNum,
      fail: failNum,
      total: totalLen,
      totalTime: totalTime
    }
    opt.each && opt.each(obj, speed)
    allData[index] = obj
    if (opt.all && loadedLength === totalLen) {
      opt.all(allData, speed)
    }
  }
  list.forEach((p1, p2) => {
    let img = new Image()
    img.src = p1
    img.onload = function () {
      imgLoad('success', p1, p2, Date.now() - now)
    }
    img.onerror = function () {
      imgLoad('fail', p1, p2, Date.now() - now)
    }
  })
}
