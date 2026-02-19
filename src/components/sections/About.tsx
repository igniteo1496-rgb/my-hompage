import { AnimatedSection } from '@/components/ui'

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-5 md:px-10 bg-white">
      <AnimatedSection className="max-w-3xl mx-auto">
        <p className="section-title">About</p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12"
          style={{ letterSpacing: '-1px' }}
        >
          왜 <span className="gradient-text">블록체인</span>인가
        </h2>

        <div className="text-lg leading-loose text-gray-700 space-y-7">
          <p>
            저는 전통 금융에서 커리어를 시작했습니다. 증권사에서 숫자를 다루고,
            보험사에서 리스크를 계산하면서 금융이라는 시스템이 어떻게
            돌아가는지 배웠죠.
          </p>

          <p>
            그러다 Web3를 만났습니다.{' '}
            <span className="highlight-text">
              누구나 참여할 수 있고, 코드가 곧 규칙이 되는 세계.
            </span>{' '}
            그 자유로움과 서사에 끌려 이 업계로 넘어왔습니다.
          </p>

          <p>
            지금은 거래소에서 전략을 담당하고 있습니다. 거래소는 독특한 위치에
            있어요. 전통 금융과 Web3가 만나는 접점이자, 규제와 혁신 사이의 중립
            지대. 여기서 양쪽을 모두 바라보면서 변화에 대응하는 게 제
            일입니다.
          </p>

          <p
            className="text-xl font-medium text-gray-900 py-8 border-t border-b border-gray-200 mt-10"
          >
            &ldquo;블록체인이 하나의 금융 인프라로 자리잡는 과정,
            <br />
            <span className="gradient-text">
              그 변화의 한가운데서 기여하고 싶습니다.
            </span>
            &rdquo;
          </p>
        </div>
      </AnimatedSection>
    </section>
  )
}
