import { container, title } from "/styles/jss/nextjs-material-kit.js";

const componentsStyle = {
  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "left"
  },
  title: {
    fontSize: "4.2rem",
    fontWeight: "600",
    display: "inline-block",
    position: "relative"
  },
  subtitle: {
    fontSize: "1.313rem",
    // maxWidth: "510px",
    margin: "10px 0 0",
    fontWeight: "500"
  },
  main: {
    marginTop: '180px',
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  },
  homeheaderImg: {
    overflow: 'visible'
  },
  overlay: {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 31.6%, rgba(0, 0, 0, 0.56) 73.85%)',
    // mixBlendMode: 'overlay',
    zIndex: 1,
  },
  sections: {
    padding: "70px 0"
  },
  container,
  title: {
    ...title,
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
};

export default componentsStyle;
