import React, { useState } from 'react';
import ItemForm from './ItemForm';
import ItemList from './ItemList';

function App() {
  const [items, setItems] = useState([]);

  const handleItemCreated = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <div>
      <ItemForm onItemCreated={handleItemCreated} />
      <ItemList />
    </div>
  );
}

export default App;
