
export default function Divider  ({ 
  className = '',
  label = '',
  labelPosition = 'center',
  color = 'gray-300',
  thickness = 1,
  textColor = 'gray-500',
  spacing = 'my-4'
})  {
  const positions: any = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  if (label) {
    return (
      <div className={`relative ${spacing} ${className}`}>
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t border-${color}`} 
               style={{ borderWidth: `${thickness}px` }} />
        </div>
        <div className={`relative flex ${positions[labelPosition]}`}>
          <span className={`bg-white px-2 text-sm text-${textColor}`}>
            {label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`border-t ${spacing} ${className}`}
      style={{ 
        borderColor: `var(--${color}, #D1D5DB)`,
        borderWidth: `${thickness}px` 
      }}
    />
  );
};