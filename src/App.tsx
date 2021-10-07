import React from 'react';

import PetDetails from './components/PetDetails';
import Pets from './components/Pets';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedId, setSelectedId] = React.useState<string>();
  return (
    <div className="w-screen h-screen flex">
      <Sidebar>
        <div
          className="cursor-pointer underline"
          onClick={() => setSelectedId(undefined)}
        >
          All Pets
        </div>
      </Sidebar>
      <div className="p-4">
        {selectedId ? (
          <PetDetails id={selectedId} />
        ) : (
          <Pets onClick={(id) => setSelectedId(id)} />
        )}
      </div>
    </div>
  );
}

export default App;
