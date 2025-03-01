import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  FaSearch,
  FaCheck,
  FaExternalLinkAlt,
  FaGithub
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoadingPage from '../LoadingPage';

// Import our static file data
import downloadFiles from '../../data/downloadFiles';

const getFileIcon = (fileName) => {
  if (!fileName) return <FaFile size={24} className="text-gray-400" />;
  
  const extension = fileName.split('.').pop().toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return <FaFilePdf size={24} className="text-red-500" />;
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
    case 'webp':
    case 'svg':
      return <FaFileImage size={24} className="text-blue-400" />;
    case 'mp4':
    case 'webm':
    case 'avi':
    case 'mov':
      return <FaFileImage size={24} className="text-purple-500" />;
    case 'mp3':
    case 'wav':
    case 'ogg':
      return <FaFileImage size={24} className="text-green-500" />;
    case 'zip':
    case 'rar':
    case '7z':
    case 'tar':
    case 'gz':
      return <FaFileArchive size={24} className="text-yellow-600" />;
    case 'doc':
    case 'docx':
      return <FaFileWord size={24} className="text-blue-600" />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel size={24} className="text-green-600" />;
    case 'ppt':
    case 'pptx':
      return <FaFileImage size={24} className="text-orange-600" />;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'html':
    case 'css':
    case 'json':
      return <FaFile size={24} className="text-indigo-400" />;
    default:
      return <FaFile size={24} className="text-gray-400" />;
  }
};

const FilePreview = ({ fileName }) => {
  const icon = getFileIcon(fileName);
  
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden">
      {icon}
    </div>
  );
};

const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number') return 'Unknown';
  
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB';
  else return (bytes / 1073741824).toFixed(1) + ' GB';
};

const Downloads = () => {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [downloadingFile, setDownloadingFile] = useState(null);
  const [fileStructure, setFileStructure] = useState(downloadFiles);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const sortFiles = (files, key, direction) => {
    if (!files) return [];
    
    return [...files].sort((a, b) => {
      // Always sort folders first
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      
      // Then sort by the selected key
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };
  
  useEffect(() => {
    // Simulate loading for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDownload = (file) => {
    setDownloadingFile(file);
    
    setTimeout(() => {
      try {
        if (file.isExternal) {
          window.open(file.path, '_blank');
          setDownloadingFile(null);
          return;
        }
        
        // For local files
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

  const filteredFiles = (files) => {
    if (!searchTerm) return files;
    return files.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderFiles = (files) => {
    // Apply sorting and filtering
    const sortedFiles = sortFiles(files, sortConfig.key, sortConfig.direction);
    const filtered = filteredFiles(sortedFiles);

    if (!filtered || filtered.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-10"
        >
          <p className="text-gray-400 text-lg">No files found</p>
          {searchTerm && (
            <p className="text-gray-500 mt-2">Try a different search term</p>
          )}
        </motion.div>
      );
    }

    return filtered.map((file, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 backdrop-blur-md rounded-xl p-4 border border-gray-700/30 mb-3 cursor-pointer overflow-hidden relative"
        onClick={() => file.type === 'folder' && setCurrentFolder(file.name)}
      >
        {/* Hover effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300"
          whileHover={{ opacity: 1 }}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {file.type === 'folder' ? (
              <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 mr-3">
                <FaFolder size={24} />
              </div>
            ) : (
              <div className="p-1 rounded-lg mr-3">
                <FilePreview fileName={file.name} />
              </div>
            )}
            <div>
              <p className="font-semibold text-white">{file.name}</p>
              {file.size && <p className="text-sm text-blue-300">{file.size}</p>}
              {file.description && <p className="text-sm text-gray-400">{file.description}</p>}
            </div>
          </div>
          
          {file.type === 'file' && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: -5 }}
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(file);
              }}
              className="p-2 rounded-full bg-gradient-to-r from-green-600/20 to-green-500/20 text-green-400 hover:text-green-300 transition-colors"
            >
              {file.isExternal ? <FaExternalLinkAlt size={18} /> : <FaDownload size={18} />}
            </motion.button>
          )}
        </div>
      </motion.div>
    ));
  };

  // Find the current folder data
  const getCurrentFolderData = () => {
    if (currentFolder === 'root') {
      return fileStructure.root;
    }
    
    // Find the folder in the root
    const folder = fileStructure.root.find(f => f.name === currentFolder);
    if (folder) return folder.items;
    
    // If not in root, check nested folders
    for (const rootFolder of fileStructure.root) {
      if (rootFolder.type === 'folder' && rootFolder.items) {
        const nestedFolder = rootFolder.items.find(f => f.name === currentFolder);
        if (nestedFolder) return nestedFolder.items;
      }
    }
    
    return [];
  };

  // Get breadcrumb path
  const getBreadcrumbPath = () => {
    if (currentFolder === 'root') {
      return [];
    }
    
    // Check if it's a direct child of root
    const isDirectChild = fileStructure.root.some(f => f.name === currentFolder);
    if (isDirectChild) {
      return [currentFolder];
    }
    
    // If not, find the parent
    for (const rootFolder of fileStructure.root) {
      if (rootFolder.type === 'folder' && rootFolder.items) {
        const nestedFolder = rootFolder.items.find(f => f.name === currentFolder);
        if (nestedFolder) {
          return [rootFolder.name, currentFolder];
        }
      }
    }
    
    return [currentFolder]; // Fallback
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-24 pb-16 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-b from-transparent to-black/80 z-0"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.h1 
            whileHover={{ scale: 1.03 }}
            className="text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Downloads
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Browse and download available resources
          </motion.p>
        </motion.div>
        
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-16"
        >
          {/* Navigation and Search Bar */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-gray-700/30 mb-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {currentFolder !== 'root' && (
                  <motion.button
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const breadcrumbs = getBreadcrumbPath();
                      if (breadcrumbs.length > 1) {
                        // Go to parent folder
                        setCurrentFolder(breadcrumbs[0]);
                      } else {
                        // Go to root
                        setCurrentFolder('root');
                      }
                    }}
                    className="p-2 mr-2 rounded-full bg-gray-700/50 text-gray-300 hover:text-white"
                  >
                    <FaArrowLeft />
                  </motion.button>
                )}
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                  {currentFolder === 'root' ? 'Files & Resources' : currentFolder}
                </h2>
              </div>
              
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-blue-600/20 text-blue-400 hover:text-blue-300"
                >
                  <FaHome size={18} />
                </motion.button>
              </Link>
            </div>
            
            {/* Breadcrumbs */}
            {currentFolder !== 'root' && (
              <div className="flex items-center mb-4 text-sm text-gray-400">
                <span 
                  className="cursor-pointer hover:text-blue-300"
                  onClick={() => setCurrentFolder('root')}
                >
                  Home
                </span>
                {getBreadcrumbPath().map((item, index, array) => (
                  <React.Fragment key={index}>
                    <span className="mx-2">/</span>
                    <span 
                      className={`${index === array.length - 1 ? 'text-blue-300' : 'cursor-pointer hover:text-blue-300'}`}
                      onClick={() => {
                        if (index < array.length - 1) {
                          setCurrentFolder(item);
                        }
                      }}
                    >
                      {item}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
            
            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="bg-gray-800/50 border border-gray-700/50 text-white rounded-lg block w-full pl-10 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* File list */}
          <div className="space-y-2">
            {renderFiles(getCurrentFolderData())}
          </div>
        </motion.div>
      </div>

      {/* Download Overlay */}
      <AnimatePresence>
        {downloadingFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 w-full max-w-md border border-gray-700/30 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-500/20">
                  {getFileIcon(downloadingFile.name)}
                </div>
                
                <h3 className="text-2xl font-bold mb-1 text-white">
                  {downloadingFile.isExternal ? 'Opening Link' : 'Downloading'}
                </h3>
                <p className="text-blue-300 mb-6">{downloadingFile.name}</p>
                
                <div className="w-full h-2 bg-gray-700 rounded-full mb-6 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  ></motion.div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 1.8 } }}
                  className="flex justify-center"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 2 }
                    }}
                    className="flex items-center bg-green-500/20 text-green-400 px-4 py-2 rounded-full"
                  >
                    <FaCheck className="mr-2" />
                    <span>Almost done...</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Downloads;