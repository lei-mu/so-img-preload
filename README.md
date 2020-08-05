# soImgPreload
soImgPreload是一个图片预加载库。原生javascript构建，兼容性良好，可用于浏览器环境的图片预加载。

## Installing
Install with npm:

```
npm install so-img-preload
```

Include via [jsDelivr CDN](https://cdn.jsdelivr.net/npm/so-img-preload):

```html
<script src="https://cdn.jsdelivr.net/npm/so-img-preload"></script>
```

## Usage
```javascript

  let loadImgArr = ['http://lorempixel.com/1600/900/?v=' + Date.now(), 'http://lorempixel.com/1600/901/?v=' + Date.now(), 'http://lorempixel.com/1600/902/?v=' + Date.now()]

  soImgPreload(loadImgArr, {
    /**
     * 每有一张图片加载完成就会回调
     * @param {Object} item - 该图片的相关数据
     * @param {String} item.status [success|fail] - 图片加载成功还是失败
     * @param {Number} item.index - 该图片在图片集合里的下标
     * @param {String} item.url - 该图片的url
     * @param {Number} item.time - 该图片加载的时长，单位ms
     * @param {Object} speed - 加载进度信息
     * @param {Number} speed.success - 当前已加载成功图片的数量
     * @param {Number} speed.fail - 当前已加载失败图片的数量
     * @param {Number} speed.total - 图片的总数量
     * @param {Number} speed.totalTime - 加载到该图片已占用的时长，单位ms
     */
    each: function (item, speed) {
      console.log('有一张图片加载完成')
      console.log(item)
      console.log(speed)
    },
    /**
     * 所有图片加载完成触发
     * @param {Array<item>} itemArr - 所有图片项的集合
     * @param {Object} statistics - 统计
     * @param {Number} statistics.success - 加载成功图片的数量
     * @param {Number} statistics.fail - 加载失败图片的数量
     * @param {Number} statistics.total - 图片的总数量
     * @param {Number} statistics.totalTime - 加载图片总占用的时长，单位ms
     */
    all: function (itemArr, statistics) {
      console.log('所有图片加载完成')
      console.log(itemArr)
      console.log(statistics)
    }
  })
```

## Options

#### **each**
*Default: None*

每加载完成一张图片的回调。

#### **all**
*Default: None*

所有图片加载完成的回调。


---


## 个人博客
[luch的博客](https://www.quanzhan.co)

<!--
feat 新功能
fix Bug 修复
docs 文档更新
style 代码的格式，标点符号的更新
refactor 代码重构
perf 性能优化
test 测试更新
build 构建系统或者包依赖更新
ci CI 配置，脚本文件等更新
chore 非 src 或者 测试文件的更新
revert commit 回退
-->
