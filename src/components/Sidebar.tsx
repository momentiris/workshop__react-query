import React from 'react';

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex-shrink-0 p-4 border-r border-black flex  items-center flex-col gap-4">
      {children}
    </div>
  );
};

export default Sidebar;
