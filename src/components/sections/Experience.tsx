import { AnimatedSection } from '@/components/ui'
import { experiences } from '@/data/experience'

export function Experience() {
  return (
    <section
      id="experience"
      className="py-16 md:py-20 px-5 md:px-10"
      style={{
        background: 'linear-gradient(180deg, #F0F4F8 0%, #FAFBFC 100%)',
      }}
    >
      <AnimatedSection className="max-w-3xl mx-auto text-center">
        <p className="section-title">Experience</p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          {experiences.map((exp, index) => (
            <div key={exp.company} className="flex items-center gap-4">
              <span
                className={`text-base md:text-lg font-medium ${
                  exp.current
                    ? 'text-gray-900 font-semibold highlight-text'
                    : 'text-gray-500'
                }`}
              >
                {exp.company}
              </span>
              {index < experiences.length - 1 && (
                <span className="text-gray-300">&rarr;</span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-6 text-gray-400 text-sm">
          전통 금융에서 시작해, 블록체인으로.
        </p>
      </AnimatedSection>
    </section>
  )
}
