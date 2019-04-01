const Navigation = ({ children, ...props }) => (
  <nav {...props}>
    {children}
    <style jsx>{`
      nav {
        align-items: center;
        display: flex;
        padding: 10px;
      }
    `}</style>
  </nav>
)

export default Navigation
