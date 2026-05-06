import { FunctionComponent, CSSProperties } from 'react';

interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | false;
  sx?: CSSProperties;
}

const Skeleton: FunctionComponent<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  sx,
}) => {
  const baseStyles: CSSProperties = {
    display: 'inline-block',
    backgroundColor: 'rgba(0, 0, 0, 0.11)',
    ...sx,
  };

  const variantStyles: CSSProperties = {
    text: {
      height: height ?? '1rem',
      borderRadius: 4,
      marginTop: 0,
      marginBottom: 0,
    },
    rectangular: {
      height: height ?? '1.5rem',
      borderRadius: 4,
    },
    rounded: {
      height: height ?? '1.5rem',
      borderRadius: 8,
    },
    circular: {
      height: height ?? '2.5rem',
      width: width ?? '2.5rem',
      borderRadius: '50%',
    },
  }[variant];

  const animationStyles: CSSProperties =
    animation === 'pulse'
      ? {
          animation: 'pulse 1.5s ease-in-out 0.5s infinite',
        }
      : animation === 'wave'
      ? {
          position: 'relative',
          overflow: 'hidden',
          animation: 'wave 1.6s linear 0.5s infinite',
        }
      : {};

  return (
    <span
      style={{
        width,
        ...baseStyles,
        ...variantStyles,
        ...animationStyles,
      }}
    >
      <style>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes wave {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        span[animation='wave']::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
        }
      `}</style>
    </span>
  );
};

export default Skeleton;