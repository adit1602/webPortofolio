import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaFolder, 
  FaFile, 
  FaDownload, 
  FaHome, 
  FaArrowLeft, 
  FaFilePdf, 
  FaFileWord, 
  FaFileExcel, 
  FaFileImage, 
  FaFileArchive,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const getFileIcon = (fileName) => {
  const extension = fileName.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return <FaFilePdf className="mr-4 text-red-500" size={24} />;
    case 'doc':
    case 'docx':
      return <FaFileWord className="mr-4 text-blue-500" size={24} />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel className="mr-4 text-green-500" size={24} />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <FaFileImage className="mr-4 text-purple-500" size={24} />;
    case 'zip':
    case 'rar':
    case '7z':
      return <FaFileArchive className="mr-4 text-yellow-500" size={24} />;
    default:
      return <FaFile className="mr-4 text-gray-500" size={24} />;
  }
};

const FilePreview = ({ fileUrl, fileName }) => {
  const [preview, setPreview] = useState(null);
  const extension = fileName.split('.').pop().toLowerCase();

  useEffect(() => {
    const generatePreview = async () => {
      try {
        // Image preview
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
          setPreview(
            <img 
              src={fileUrl} 
              alt="File Preview" 
              className="w-full h-full object-cover rounded-lg"
            />
          );
          return;
        }

        // PDF preview (requires PDF.js or similar)
        if (extension === 'pdf') {
          setPreview(
            <iframe 
              src={fileUrl} 
              className="w-full h-full"
              title="PDF Preview"
            />
          );
          return;
        }

        // Fallback to icon if no preview available
        setPreview(getFileIcon(fileName));
      } catch (error) {
        console.error('Preview generation error:', error);
        setPreview(getFileIcon(fileName));
      }
    };

    generatePreview();
  }, [fileUrl, fileName, extension]);

  return (
    <div className="w-12 h-12 overflow-hidden rounded-lg">
      {preview}
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Downloads = () => {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [fileStructure, setFileStructure] = useState({ root: [] });

  // New state for sorting and menu
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });

  // Sorting function
  const sortFiles = (files, key, direction) => {
    return [...files].sort((a, b) => {
      // Handle different sorting scenarios
      switch(key) {
        case 'name':
          return direction === 'asc' 
            ? a.name.localeCompare(b.name) 
            : b.name.localeCompare(a.name);
        
        case 'size':
          // Convert size to comparable numeric value
          const parseSize = (sizeStr) => {
            const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            const [value, unit] = sizeStr.split(' ');
            const multiplier = units.indexOf(unit);
            return parseFloat(value) * Math.pow(1024, multiplier);
          };
          
          return direction === 'asc'
            ? parseSize(a.size || '0 Bytes') - parseSize(b.size || '0 Bytes')
            : parseSize(b.size || '0 Bytes') - parseSize(a.size || '0 Bytes');
        
        case 'date':
          // Assuming you'll add a date property to files
          return direction === 'asc'
            ? new Date(a.date || 0) - new Date(b.date || 0)
            : new Date(b.date || 0) - new Date(a.date || 0);
        
        default:
          return 0;
      }
    });
  };

  // Sorting menu component
  const SortMenu = () => (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute right-0 top-full mt-2 bg-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
    >
      {[
        { key: 'name', label: 'Sort by Name' },
        { key: 'size', label: 'Sort by Size' },
        { key: 'date', label: 'Sort by Date' }
      ].map((option) => (
        <div key={option.key} className="flex">
          <button
            onClick={() => {
              setSortConfig({
                key: option.key,
                direction: sortConfig.key === option.key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
              });
              setIsSortMenuOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-600 flex items-center"
          >
            <FaSort className="mr-2" />
            {option.label} {sortConfig.key === option.key && (
              <span className="ml-2 text-xs">
                {sortConfig.direction === 'asc' ? '▲' : '▼'}
              </span>
            )}
          </button>
        </div>
      ))}
    </motion.div>
  );

  useEffect(() => {
    const importFiles = async () => {
      try {
        const files = import.meta.glob('/downloads/**/*', {
          eager: true,
          query: '?url', 
          import: 'default',
        });

        const structure = { root: [] };
        const folderMap = new Map();

        // Process imported files
        const filePromises = Object.entries(files).map(async ([filePath, fileUrl]) => {
          // Remove '/downloads/' from the start and split path
          const relativePath = filePath.replace('/downloads/', '').split('/');
          
          // Last item is the filename
          const fileName = relativePath.pop();
          
          // Remaining items are folders
          const folderPath = relativePath.join('/');

          // Create folder if it doesn't exist
          if (!folderMap.has(folderPath)) {
            const folderItem = {
              name: folderPath || 'Root',
              type: 'folder',
              items: []
            };
            structure.root.push(folderItem);
            folderMap.set(folderPath, folderItem);
          }

          // Get the corresponding folder
          const parentFolder = folderMap.get(folderPath);

          // Fetch file size
          let fileSize = 'Unknown';
          try {
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            fileSize = formatFileSize(blob.size);
          } catch (error) {
            console.error(`Error fetching size for ${fileName}:`, error);
          }

          // Add file to folder
          parentFolder.items.push({
            name: fileName,
            type: 'file',
            path: fileUrl,
            size: fileSize
          });
        });

        await Promise.all(filePromises);

        setFileStructure(structure);
      } catch (error) {
        console.error('Error importing files:', error);
      }
    };

    importFiles();
  }, []);

  const handleDownload = (file) => {
    setDownloadingFile(file);

    setTimeout(() => {
      try {
        const link = document.createElement('a');
        link.href = file.path;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download error:', error);
      } finally {
        setDownloadingFile(null);
      }
    }, 2000);
  };

  const renderFiles = (files) => {
    // Apply sorting
    const sortedFiles = sortFiles(files, sortConfig.key, sortConfig.direction);

    if (!sortedFiles || sortedFiles.length === 0) {
      return <p className="text-center text-gray-500">No files found</p>;
    }

    return files.map((file, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-2 hover:bg-gray-700 transition"
        onClick={() => file.type === 'folder' && setCurrentFolder(file.name)}
      >
        <motion.div className="flex items-center">
          {file.type === 'folder' ? (
            <FaFolder className="mr-4 text-yellow-500" size={24} />
          ) : (
            <FilePreview fileUrl={file.path} fileName={file.name} />
          )}
          <div className="ml-4">
            <p className="font-semibold">{file.name}</p>
            {file.size && <p className="text-sm text-gray-400">{file.size}</p>}
          </div>
        </motion.div>
        {file.type === 'file' && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(file);
            }}
            className="text-green-500 hover:text-green-400"
          >
            <FaDownload />
          </motion.button>
        )}
      </motion.div>
    ));
  };

  return (
    <ddiv className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-32 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gray-700 p-4 flex items-center justify-between">
          <div className="flex items-center">
            {currentFolder !== 'root' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentFolder('root')}
                className="mr-4"
              >
                <FaArrowLeft />
              </motion.button>
            )}
            <h2 className="text-xl font-bold">
              {currentFolder === 'root' ? 'Downloads' : currentFolder}
            </h2>
          </div>
          <div className="flex space-x-2">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-white hover:text-primary"
              >
                <FaHome />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* File List */}
        <div className="p-4">
          {currentFolder === 'root'
            ? renderFiles(fileStructure.root)
            : renderFiles(fileStructure.root.find(folder => folder.name === currentFolder)?.items || [])}
        </div>

        {/* Download Overlay */}
        {downloadingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md text-center"
            >
              <FaFile className="mx-auto text-4xl text-blue-500 mb-4" />
              <motion.h3 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }} 
                className="text-xl font-bold mb-2"
              >
                Downloading
              </motion.h3>
              <motion.p 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }} 
                className="text-gray-600 dark:text-gray-300 mb-4"
              >
                {downloadingFile.name}
              </motion.p>
              <div className="w- full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2 }}
                  className="bg-blue-600 h-2.5 rounded-full"
                ></motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </ddiv>
  );
};

export default Downloads;