/**
 * 图片预加载
 * @param {Array} list - 图片url 集合
 * @param {Object} opt - 配置项
 * @param {Function} opt.each - 每加载完成一张图片回调函数
 * @param {Function} opt.all - 所有图片加载完成回调函数
 * @param {Undefined|Number} opt.limit - 同时加载的图片限制
 */
export default function lcImgPreload(list = [], opt = {}) {
  const totalLen = list.length
  if (totalLen === 0) return
  let allData = []
  let loadedLength = 0
  let successNum = 0
  let failNum = 0
  let totalNow = null

  /**
   * 加载完成回调
   * @param {String} status [success|fail] - 加载状态
   * @param {String} url - 当前图片的url
   * @param {Number} index - 当前图片下标
   * @param {Number} time - 当前图片的加载占时，单位ms
   */
  function imgLoadEnd(status, url, index, time) {
    loadedLength++
    status === 'success' ? successNum++ : failNum++
    let totalTime = Date.now() - totalNow
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

  function imgLoad(url, index, cb) {
    let img = new Image()
    let s_img_now = Date.now()
    img.src = url
    img.onload = function () {
      imgLoadEnd('success', url, index, Date.now() - s_img_now)
      cb && cb()
    }
    img.onerror = function () {
      imgLoadEnd('fail', url, index, Date.now() - s_img_now)
      cb && cb()
    }
  }

  let nextLoadIndex = opt.limit

  let taskList = []

  function loadNext() {
    if (nextLoadIndex > totalLen - 1) {
      return
    }
    taskList[nextLoadIndex]()
    nextLoadIndex += 1
  }

  if (typeof opt.limit === 'number' && opt.limit > 0) {

    let createTask = (url, index) => {
      return () => {
        imgLoad(url, index, loadNext)
      }
    }

    list.forEach((p1, p2) => {
      taskList.push(createTask(p1, p2))
    })
    totalNow = Date.now()
    for (let i = 0, len = Math.min(opt.limit, totalLen); i < len; i++) {
      taskList[i]()
    }
  } else {
    totalNow = Date.now()
    list.forEach((p1, p2) => {
      imgLoad(p1, p2)
    })
  }
}
