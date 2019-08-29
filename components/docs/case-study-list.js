import CaseStudyCard from './case-study-card'
export default function CaseStudyList({ caseStudies, offset }) {
  return (
    <div className="wrapper">
      <ul>
        {caseStudies.map(caseStudy => (
          <li key={caseStudy.href}>
            <CaseStudyCard
              icon={caseStudy.icon}
              description={caseStudy.description}
              href={caseStudy.href}
            />
          </li>
        ))}
      </ul>
      <style jsx>{`
        ul {
          transform: translate3d${offset ? offset : '0'}px, 0, 0);
        }
      `}</style>
      <style jsx>{`
        .wrapper {
          position: relative;
          overflow: hidden;
          z-index: 2;
          padding: 75px 0;
        }
        ul {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: center;
          margin: 0;
          padding: 0;
          transition: transform 300ms ease-in-out;
        }
        li {
          list-style: none;
        }
      `}</style>
    </div>
  )
}
