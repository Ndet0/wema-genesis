// ============================================
// Button Component
// ============================================
import styles from './Button.module.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  className = '',
  ...props 
}) => {
  const buttonClasses = `
    ${styles.btn} 
    ${styles[variant]} 
    ${styles[size]} 
    ${isLoading ? styles.loading : ''} 
    ${className}
  `.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} aria-hidden="true"></span>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

// ============================================
// Card Component
// ============================================
export const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => (
  <div 
    className={`${styles.card} ${hover ? styles.hover : ''} ${className}`}
    {...props}
  >
    {children}
  </div>
);

// ============================================
// Input Component with Validation
// ============================================
import { forwardRef } from 'react';

export const Input = forwardRef(({ 
  label,
  error,
  helperText,
  required = false,
  className = '',
  ...props 
}, ref) => {
  const inputId = props.id || `input-${props.name}`;

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`${styles.input} ${error ? styles.error : ''}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

// ============================================
// Alert Component
// ============================================
export const Alert = ({ 
  children, 
  variant = 'info', 
  icon,
  onClose,
  className = '' 
}) => {
  const icons = {
    success: '✅',
    error: '⚠️',
    warning: '⚠️',
    info: 'ℹ️'
  };

  return (
    <div 
      className={`${styles.alert} ${styles[variant]} ${className}`}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={variant === 'error' ? 'assertive' : 'polite'}
    >
      <span className={styles.alertIcon} aria-hidden="true">
        {icon || icons[variant]}
      </span>
      <div className={styles.alertContent}>
        {children}
      </div>
      {onClose && (
        <button 
          className={styles.alertClose}
          onClick={onClose}
          aria-label="Close alert"
        >
          ×
        </button>
      )}
    </div>
  );
};

// ============================================
// LoadingSpinner Component
// ============================================
export const LoadingSpinner = ({ 
  size = 'medium', 
  text,
  className = '' 
}) => (
  <div className={`${styles.spinnerWrapper} ${className}`}>
    <div 
      className={`${styles.spinner} ${styles[size]}`}
      role="status"
      aria-label={text || 'Loading'}
    >
      <span className={styles.srOnly}>{text || 'Loading...'}</span>
    </div>
    {text && <p className={styles.spinnerText}>{text}</p>}
  </div>
);

// ============================================
// Modal Component
// ============================================
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = 'medium',
  className = '' 
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      modalRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      previousFocusRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={`${styles.modal} ${styles[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
      >
        {title && (
          <div className={styles.modalHeader}>
            <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ============================================
// StatCard Component
// ============================================
export const StatCard = ({ 
  icon, 
  value, 
  label, 
  trend,
  className = '' 
}) => (
  <Card className={`${styles.statCard} ${className}`} hover>
    <div className={styles.statIcon} aria-hidden="true">{icon}</div>
    <div className={styles.statValue}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
    {trend && <div className={styles.statTrend}>{trend}</div>}
  </Card>
);

// ============================================
// Section Component
// ============================================
export const Section = ({ 
  id, 
  title, 
  subtitle, 
  children,
  className = '' 
}) => (
  <section id={id} className={`${styles.section} ${className}`}>
    {(title || subtitle) && (
      <header className={styles.sectionHeader}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </header>
    )}
    <div className={styles.sectionContent}>
      {children}
    </div>
  </section>
);