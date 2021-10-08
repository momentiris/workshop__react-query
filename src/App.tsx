import React from 'react';
import PetCount from './components/PetCount';

import PetDetails from './components/PetDetails';
import Pets from './components/Pets';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedId, setSelectedId] = React.useState<string>();
  return (
    <div className="w-screen h-screen flex">
      <Sidebar>
        <div>
          <div
            className="cursor-pointer underline mb-10"
            onClick={() => setSelectedId(undefined)}
          >
            All Pets
          </div>

          <PetCount />
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
