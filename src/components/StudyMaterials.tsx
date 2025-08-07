import React, { useState } from 'react';
import { FileTextIcon, ImageIcon, BookIcon, FileIcon, FolderIcon, PlusIcon, SearchIcon, UploadIcon, GridIcon, ListIcon, XIcon, DownloadIcon, EyeIcon } from 'lucide-react';
export const StudyMaterials = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  // Mock data for study materials
  const [materials, setMaterials] = useState([{
    id: 1,
    title: 'Biology Notes Ch. 5',
    type: 'notes',
    date: 'May 10',
    size: '1.2 MB',
    subject: 'Biology'
  }, {
    id: 2,
    title: 'Calculus Formula Sheet',
    type: 'pdf',
    date: 'May 9',
    size: '450 KB',
    subject: 'Mathematics'
  }, {
    id: 3,
    title: 'Spanish Vocabulary',
    type: 'doc',
    date: 'May 8',
    size: '320 KB',
    subject: 'Spanish'
  }, {
    id: 4,
    title: 'Physics Diagrams',
    type: 'image',
    date: 'May 7',
    size: '2.1 MB',
    subject: 'Physics'
  }, {
    id: 5,
    title: 'History Timeline',
    type: 'pdf',
    date: 'May 6',
    size: '1.5 MB',
    subject: 'History'
  }, {
    id: 6,
    title: 'Chemistry Lab Report',
    type: 'doc',
    date: 'May 5',
    size: '780 KB',
    subject: 'Chemistry'
  }, {
    id: 7,
    title: 'Literature Essay Draft',
    type: 'doc',
    date: 'May 4',
    size: '540 KB',
    subject: 'English'
  }, {
    id: 8,
    title: 'Economics Graphs',
    type: 'image',
    date: 'May 3',
    size: '1.8 MB',
    subject: 'Economics'
  }]);
  // State for modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewMaterialModalOpen, setIsNewMaterialModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  // State for new material
  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialType, setNewMaterialType] = useState('notes');
  const [newMaterialSubject, setNewMaterialSubject] = useState('');
  // State for filter
  const [selectedSubject, setSelectedSubject] = useState('');
  const subjects = [...new Set(materials.map(item => item.subject))];
  const getFileIcon = type => {
    switch (type) {
      case 'pdf':
        return <FileTextIcon className="h-6 w-6 text-red-500" />;
      case 'image':
        return <ImageIcon className="h-6 w-6 text-blue-500" />;
      case 'notes':
        return <BookIcon className="h-6 w-6 text-green-500" />;
      case 'doc':
        return <FileIcon className="h-6 w-6 text-indigo-500" />;
      default:
        return <FileIcon className="h-6 w-6 text-gray-500" />;
    }
  };
  const filteredMaterials = materials.filter(material => (material.title.toLowerCase().includes(searchTerm.toLowerCase()) || material.subject.toLowerCase().includes(searchTerm.toLowerCase())) && (!selectedSubject || material.subject === selectedSubject));
  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };
  const handleOpenNewMaterialModal = () => {
    setIsNewMaterialModalOpen(true);
  };
  const handleViewMaterial = material => {
    setSelectedMaterial(material);
    setIsViewModalOpen(true);
  };
  const handleDeleteMaterial = materialId => {
    setMaterials(materials.filter(material => material.id !== materialId));
    setIsViewModalOpen(false);
  };
  const handleAddNewMaterial = () => {
    if (newMaterialTitle.trim()) {
      const newMaterial = {
        id: Date.now(),
        title: newMaterialTitle,
        type: newMaterialType,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
        size: '0 KB',
        subject: newMaterialSubject || 'General'
      };
      setMaterials([newMaterial, ...materials]);
      setNewMaterialTitle('');
      setNewMaterialType('notes');
      setNewMaterialSubject('');
      setIsNewMaterialModalOpen(false);
    }
  };
  const handleUploadFile = () => {
    // Simulate a successful upload
    setTimeout(() => {
      setIsUploadModalOpen(false);
      // You could add a new material here if needed
    }, 1500);
  };
  const handleDownload = material => {
    // Simulate a download action
    alert(`Downloading: ${material.title}`);
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Study Materials</h1>
        <button onClick={handleOpenUploadModal} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
          <UploadIcon size={18} className="mr-1" />
          <span>Upload</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="relative flex-1 max-w-md">
          <input type="text" placeholder="Search materials..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="flex items-center space-x-4">
          <select className="bg-white p-2 rounded-lg border border-gray-200 text-sm" value={selectedSubject} onChange={e => setSelectedSubject(e.target.value)}>
            <option value="">All Subjects</option>
            {subjects.map(subject => <option key={subject} value={subject}>
                {subject}
              </option>)}
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`} onClick={() => setViewMode('grid')}>
              <GridIcon size={18} className="text-gray-600" />
            </button>
            <button className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`} onClick={() => setViewMode('list')}>
              <ListIcon size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-indigo-100 p-3 rounded-lg">
            <FolderIcon className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-800">All Materials</h2>
            <p className="text-sm text-gray-500">
              {filteredMaterials.length} files
            </p>
          </div>
        </div>
        {viewMode === 'grid' ? <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredMaterials.map(material => <div key={material.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewMaterial(material)}>
                <div className="flex items-center justify-center h-24 bg-gray-50 rounded mb-3">
                  {getFileIcon(material.type)}
                </div>
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {material.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{material.date}</span>
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    {material.subject}
                  </span>
                </div>
              </div>)}
            <div onClick={handleOpenNewMaterialModal} className="p-4 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center h-full cursor-pointer hover:bg-gray-50">
              <PlusIcon className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Add New Material</span>
            </div>
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMaterials.map(material => <tr key={material.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
                          {getFileIcon(material.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {material.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {material.type.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {material.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {material.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button onClick={e => {
                  e.stopPropagation();
                  handleViewMaterial(material);
                }} className="text-indigo-600 hover:text-indigo-900 mr-3">
                        View
                      </button>
                      <button onClick={e => {
                  e.stopPropagation();
                  handleDownload(material);
                }} className="text-gray-600 hover:text-gray-900">
                        Download
                      </button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Upload File
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <UploadIcon size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop files here, or click to select files
                </p>
                <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm">
                  Select Files
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="">Select a subject</option>
                  {subjects.map(subject => <option key={subject} value={subject}>
                      {subject}
                    </option>)}
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsUploadModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleUploadFile} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* New Material Modal */}
      {isNewMaterialModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add New Material
              </h3>
              <button onClick={() => setIsNewMaterialModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input type="text" value={newMaterialTitle} onChange={e => setNewMaterialTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter material title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select value={newMaterialType} onChange={e => setNewMaterialType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg">
                  <option value="notes">Notes</option>
                  <option value="pdf">PDF</option>
                  <option value="doc">Document</option>
                  <option value="image">Image</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input type="text" value={newMaterialSubject} onChange={e => setNewMaterialSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="e.g., Mathematics, History" />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsNewMaterialModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleAddNewMaterial} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Add Material
                </button>
              </div>
            </div>
          </div>
        </div>}

      {/* View Material Modal */}
      {isViewModalOpen && selectedMaterial && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Material Details
              </h3>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  {getFileIcon(selectedMaterial.type)}
                </div>
                <div>
                  <h4 className="font-medium text-lg text-gray-800">
                    {selectedMaterial.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {selectedMaterial.type.toUpperCase()} •{' '}
                    {selectedMaterial.size}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded mr-2">
                      {selectedMaterial.subject}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added on {selectedMaterial.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p>
                  This is a preview of the material content. In a real
                  application, you would see the actual content here.
                </p>
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => handleDeleteMaterial(selectedMaterial.id)} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                  Delete
                </button>
                <button onClick={() => handleDownload(selectedMaterial)} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
                  <DownloadIcon size={16} className="mr-1" />
                  Download
                </button>
                <button onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                  <EyeIcon size={16} className="mr-1" />
                  View Full
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};