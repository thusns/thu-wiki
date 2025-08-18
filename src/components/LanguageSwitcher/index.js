import React, {useState, useRef, useEffect} from 'react';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function LanguageSwitcher() {
  const {i18n: {locales, currentLocale, localeConfigs}} = useDocusaurusContext();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to detect current locale from URL path
  const getCurrentLocaleFromPath = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    
    // Check if the first segment is a locale
    if (pathSegments.length > 0 && locales.includes(pathSegments[0])) {
      return pathSegments[0];
    }
    
    // If no locale in path, it's the default locale
    return 'zh-Hans';
  };

  // Use the detected locale from path instead of context
  const actualCurrentLocale = getCurrentLocaleFromPath();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to get clean path without locale prefix and avoid stacking
  const getCleanPath = (pathname) => {
    // Split the path into segments
    const segments = pathname.split('/').filter(segment => segment);
    
    // Remove all locale prefixes from the beginning
    let cleanSegments = [...segments];
    while (cleanSegments.length > 0 && locales.includes(cleanSegments[0])) {
      cleanSegments.shift();
    }
    
    // Return the clean path
    return '/' + cleanSegments.join('/');
  };

  const handleLocaleChange = (newLocale) => {
    const cleanPath = getCleanPath(location.pathname);
    
    // Build new URL
    let newPath;
    if (newLocale === 'zh-Hans') {
      // Default locale - no prefix needed
      newPath = cleanPath || '/';
    } else {
      newPath = `/${newLocale}${cleanPath}`;
    }
    
    // Use window.location.href to completely replace the current page
    // This prevents URL path stacking
    window.location.href = newPath;
  };

  return (
    <div className="navbar__item dropdown dropdown--hoverable" ref={dropdownRef}>
      <a
        href="#"
        className="navbar__link"
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
        role="button"
        onClick={(e) => {
          e.preventDefault();
          setDropdownOpen(!dropdownOpen);
        }}
        style={{ userSelect: 'none' }}
      >
        {localeConfigs[actualCurrentLocale]?.label || actualCurrentLocale}
      </a>
      {dropdownOpen && (
        <ul className="dropdown__menu" style={{ display: 'block' }}>
          {locales.map((locale) => (
            <li key={locale}>
              <a
                className={`dropdown__link ${
                  locale === actualCurrentLocale ? 'dropdown__link--active' : ''
                }`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (locale !== actualCurrentLocale) {
                    setDropdownOpen(false);
                    handleLocaleChange(locale);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                {localeConfigs[locale]?.label || locale}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageSwitcher;