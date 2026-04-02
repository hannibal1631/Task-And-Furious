function CardModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Overlay */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Content */}
      <div className='relative z-10 w-full px-4 flex justify-center'>
        {children}
      </div>
    </div>
  );
}

export default CardModal;
