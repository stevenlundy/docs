const Navigation = ({ children, ...props }) => (
  <nav {...props}>
    {children}
    <style jsx>{`
      nav {
        align-items: center;
        display: flex;
        margin-left: 16px;
      }

      @media screen and (max-width: 950px) {
        nav {
          margin-left: 0;
        }
      }
    `}</style>
  </nav>
)

export default Navigation
