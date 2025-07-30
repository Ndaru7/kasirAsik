import { useEffect } from 'react';
import { useLocation } from 'react-router';

const formatSegment = (segment) =>
  segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const LayoutWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const segments = location.pathname
      .split('/')
      .filter((seg) => seg && !seg.match(/^(\d+|[a-zA-Z0-9\-]{8,})$/));

    const pageTitle = segments.length
      ? segments.map(formatSegment).join(' ')
      : 'Landing Page';

    document.title = `${pageTitle} | TailAdmin`;
  }, [location]);

  return children;
};

export default LayoutWrapper;
