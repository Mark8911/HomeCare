// import parseTime, formatTime and set to filter
export {parseTime, formatTime} from '@/utils'

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {string} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// 格式化金额,单位:分
export function formatAmount(price, digits = 2, prefix = '￥', suffix = '') {
  price = isNaN(price) ? 0 : price;
  if (!price) {
    return prefix + '0.00'
  }
  return prefix + Number(price / 100).toFixed(digits) + suffix
}

// 格式化金额,单位:元
export function formatPrice(price, digits = 2, prefix = '￥', suffix = '') {
  if (!price) {
    return prefix + '0.00'
  }
  return prefix + Number(price * 100 / 100).toFixed(digits) + suffix
}

// 不足补0
export function padStart(str = '') {
  return String(str).padStart(2, '0')
}
// 小时 转 天
export function h2d(hour = 0) {
  return hour > 24 ? parseInt(hour / 24) : 0
}

// 不足补0
export function bluetoothAdapterStateFilter(val) {
  const map = {
    true: '是',
    false: '否',
    '未知': '未知'
  }
  return map[val]
}