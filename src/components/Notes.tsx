import React, { useState } from 'react';
import { PlusIcon, SearchIcon, TagIcon, CalendarIcon, TrashIcon, EditIcon, SaveIcon, XIcon } from 'lucide-react';
export const Notes = () => {
  // Mock notes data
  const initialNotes = [{
    id: 1,
    title: 'Biology Exam Notes',
    content: 'Cell structure: membrane, cytoplasm, nucleus\nPhotosynthesis: light reactions, Calvin cycle\nCellular respiration: glycolysis, Krebs cycle, electron transport chain',
    tags: ['Biology', 'Exam Prep'],
    date: 'May 10, 2023',
    color: 'green'
  }, {
    id: 2,
    title: 'History Essay Ideas',
    content: 'Thesis: The economic factors leading to the Industrial Revolution were more significant than social factors.\n\nPoints to cover:\n- Agricultural revolution\n- Colonial trade\n- Technological innovations\n- Population growth',
    tags: ['History', 'Essay'],
    date: 'May 8, 2023',
    color: 'blue'
  }, {
    id: 3,
    title: 'Math Formulas',
    content: "Quadratic Formula: x = (-b ± √(b² - 4ac)) / 2a\n\nDerivative Rules:\n- Power Rule: d/dx(xⁿ) = n·xⁿ⁻¹\n- Product Rule: d/dx(f·g) = f·dg/dx + g·df/dx\n- Chain Rule: d/dx(f(g(x)) = f'(g(x))·g'(x)",
    tags: ['Math', 'Reference'],
    date: 'May 5, 2023',
    color: 'purple'
  }];
  const [notes, setNotes] = useState(initialNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: '',
    content: '',
    tags: []
  });
  const [isNewNoteModalOpen, setIsNewNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: []
  });
  const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()) || note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
  const handleNoteClick = (id: number) => {
    setActiveNote(activeNote === id ? null : id);
    setEditMode(false);
  };
  const handleEditNote = () => {
    const note = notes.find(note => note.id === activeNote);
    if (note) {
      setEditedNote({
        title: note.title,
        content: note.content,
        tags: [...note.tags]
      });
      setEditMode(true);
    }
  };
  const handleSaveNote = () => {
    if (!activeNote) return;
    setNotes(notes.map(note => note.id === activeNote ? {
      ...note,
      title: editedNote.title,
      content: editedNote.content,
      tags: editedNote.tags
    } : note));
    setEditMode(false);
  };
  const handleCancelEdit = () => {
    setEditMode(false);
  };
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (activeNote === id) {
      setActiveNote(null);
      setEditMode(false);
    }
  };
  const handleCreateNewNote = () => {
    setIsNewNoteModalOpen(true);
  };
  const handleSaveNewNote = () => {
    if (newNote.title.trim()) {
      const colors = ['green', 'blue', 'purple', 'yellow', 'red'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newNoteObject = {
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        tags: newNote.tags,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        color: randomColor
      };
      setNotes([newNoteObject, ...notes]);
      setNewNote({
        title: '',
        content: '',
        tags: []
      });
      setIsNewNoteModalOpen(false);
      setActiveNote(newNoteObject.id);
    }
  };
  const getColorClass = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-100 border-green-300';
      case 'blue':
        return 'bg-blue-100 border-blue-300';
      case 'purple':
        return 'bg-purple-100 border-purple-300';
      case 'yellow':
        return 'bg-yellow-100 border-yellow-300';
      case 'red':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
        <button onClick={handleCreateNewNote} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
          <PlusIcon size={18} className="mr-1" />
          <span>New Note</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 space-y-4">
          <div className="relative">
            <input type="text" placeholder="Search notes..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <SearchIcon size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-700">All Notes</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredNotes.length > 0 ? filteredNotes.map(note => <div key={note.id} className={`p-4 cursor-pointer hover:bg-gray-50 ${activeNote === note.id ? 'bg-indigo-50' : ''}`} onClick={() => handleNoteClick(note.id)}>
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-800">
                        {note.title}
                      </h3>
                      <button onClick={e => {
                  e.stopPropagation();
                  handleDeleteNote(note.id);
                }} className="text-gray-400 hover:text-red-500">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {note.content}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <CalendarIcon size={12} className="mr-1" />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {note.tags.map((tag, index) => <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                          {tag}
                        </span>)}
                    </div>
                  </div>) : <div className="p-4 text-center text-gray-500">
                  No notes found. Create a new note or try a different search
                  term.
                </div>}
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          {activeNote ? <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full">
              {editMode ? <div className="p-6 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <input type="text" value={editedNote.title} onChange={e => setEditedNote({
                ...editedNote,
                title: e.target.value
              })} className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-1 w-full focus:outline-none focus:border-indigo-300" placeholder="Note title" />
                    <div className="flex space-x-2">
                      <button onClick={handleCancelEdit} className="p-1 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
                        <XIcon size={20} />
                      </button>
                      <button onClick={handleSaveNote} className="p-1 text-indigo-600 hover:text-indigo-800 rounded-full hover:bg-indigo-50">
                        <SaveIcon size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <TagIcon size={16} className="text-gray-400 mr-2" />
                      <input type="text" value={editedNote.tags.join(', ')} onChange={e => setEditedNote({
                  ...editedNote,
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })} className="text-sm text-gray-600 w-full focus:outline-none" placeholder="Add tags separated by commas" />
                    </div>
                  </div>
                  <textarea value={editedNote.content} onChange={e => setEditedNote({
              ...editedNote,
              content: e.target.value
            })} className="flex-1 text-gray-700 w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 resize-none" placeholder="Start writing your note here..." />
                </div> : <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {notes.find(note => note.id === activeNote)?.title}
                    </h2>
                    <button onClick={handleEditNote} className="p-1 text-gray-500 hover:text-indigo-600 rounded-full hover:bg-gray-100">
                      <EditIcon size={20} />
                    </button>
                  </div>
                  <div className="flex items-center mb-4">
                    <TagIcon size={16} className="text-gray-400 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {notes.find(note => note.id === activeNote)?.tags.map((tag, index) => <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>)}
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mb-6">
                    <CalendarIcon size={14} className="mr-1" />
                    <span>
                      {notes.find(note => note.id === activeNote)?.date}
                    </span>
                  </div>
                  <div className="prose max-w-none">
                    {notes.find(note => note.id === activeNote)?.content.split('\n').map((paragraph, index) => <p key={index} className="mb-4 text-gray-700">
                          {paragraph}
                        </p>)}
                  </div>
                </div>}
            </div> : <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="bg-indigo-100 p-4 rounded-full mb-4">
                <EditIcon className="h-8 w-8 text-indigo-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Note Selected
              </h2>
              <p className="text-gray-500 mb-6">
                Select a note from the list or create a new one to get started.
              </p>
              <button onClick={handleCreateNewNote} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-indigo-700">
                <PlusIcon size={18} className="mr-1" />
                <span>Create New Note</span>
              </button>
            </div>}
        </div>
      </div>
      {/* New Note Modal */}
      {isNewNoteModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Create New Note
              </h3>
              <button onClick={() => setIsNewNoteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XIcon size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Note Title
                </label>
                <input type="text" value={newNote.title} onChange={e => setNewNote({
              ...newNote,
              title: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Enter note title" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags
                </label>
                <input type="text" value={newNote.tags.join(', ')} onChange={e => setNewNote({
              ...newNote,
              tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
            })} className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Add tags separated by commas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea value={newNote.content} onChange={e => setNewNote({
              ...newNote,
              content: e.target.value
            })} className="w-full p-2 border border-gray-300 rounded-lg h-40 resize-none" placeholder="Start writing your note here..." />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button onClick={() => setIsNewNoteModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button onClick={handleSaveNewNote} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Create Note
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};