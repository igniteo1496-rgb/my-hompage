import { SITE_CONFIG } from './constants'

export function openContactEmail() {
  if (!SITE_CONFIG.email) return
  const subject = encodeURIComponent('협업 문의')
  const body = encodeURIComponent(`안녕하세요, ${SITE_CONFIG.name}님.\n\n문의 내용을 작성해주세요.`)
  window.open(`mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`)
}
