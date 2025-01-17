import { useState } from 'react'
import './assets/css/tailwind.css'
import './assets/css/app.css'
import { Toaster } from 'react-hot-toast';
import { PersonForm } from './components/PersonForm';
import { PersonList } from './components/PersonList';


function App() {
  const [refreshList, setRefreshList] = useState(0);

  const handlePersonAdded = () => {
    setRefreshList(prev => prev + 1);
  };

  return (
    <>
     <div className="min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
            <h1 className="text-2xl font-bold text-blue-400 mb-6">
              Personal Data Registration
            </h1>
            <div className="max-w-3xl mx-auto">
              <PersonForm onSuccess={handlePersonAdded} />
              <PersonList refresh={refreshList} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
