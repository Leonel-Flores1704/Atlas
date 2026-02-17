'use client';

import { useState } from 'react';
import { X, Folder, Tag, FileText } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: { name: string; description: string; category: string; color: string }) => void;
}

export function CreateProjectModal({ isOpen, onClose, onCreateProject }: CreateProjectModalProps) {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('teal');

  const categories = [
    'Biotecnología',
    'Nanotecnología',
    'Inteligencia Artificial',
    'Genómica',
    'Física Cuántica',
    'Química Molecular',
    'Ciencia de Materiales',
    'Neurociencia',
    'Otro'
  ];

  const colors = [
    { name: 'teal', class: 'bg-teal-500', hoverClass: 'hover:ring-teal-500' },
    { name: 'blue', class: 'bg-blue-500', hoverClass: 'hover:ring-blue-500' },
    { name: 'purple', class: 'bg-purple-500', hoverClass: 'hover:ring-purple-500' },
    { name: 'pink', class: 'bg-pink-500', hoverClass: 'hover:ring-pink-500' },
    { name: 'orange', class: 'bg-orange-500', hoverClass: 'hover:ring-orange-500' },
    { name: 'green', class: 'bg-green-500', hoverClass: 'hover:ring-green-500' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (projectName.trim()) {
      onCreateProject({
        name: projectName,
        description,
        category,
        color: selectedColor
      });
      // Reset form
      setProjectName('');
      setDescription('');
      setCategory('');
      setSelectedColor('teal');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-800 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/10 rounded-lg">
              <Folder className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Crear Nuevo Proyecto</h2>
              <p className="text-sm text-gray-400">Organiza tus chats de investigación</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nombre del Proyecto *
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Ej: Investigación de Proteínas"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Descripción (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descripción de tu proyecto de investigación..."
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
            >
              <option value="">Seleccionar categoría...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Color Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Color del Proyecto
            </label>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-lg ${color.class} ${color.hoverClass} transition-all ${
                    selectedColor === color.name
                      ? 'ring-4 ring-offset-2 ring-offset-gray-900'
                      : 'hover:ring-2 ring-offset-2 ring-offset-gray-900'
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          {projectName && (
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <p className="text-xs text-gray-400 mb-2">Vista Previa:</p>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${colors.find(c => c.name === selectedColor)?.class}`} />
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{projectName}</p>
                  {category && <p className="text-xs text-gray-400">{category}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!projectName.trim()}
              className="flex-1 px-4 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-500"
            >
              Crear Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
