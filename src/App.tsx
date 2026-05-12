/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Socials from './pages/Socials';
import CustomScrollbar from './components/CustomScrollbar';

export default function App() {
  return (
    <LanguageProvider>
      <CustomScrollbar />
      <Routes>
        {/* Italian Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/socials" element={<Socials />} />

        {/* English Routes */}
        <Route path="/en" element={<Home />} />
        <Route path="/en/socials" element={<Socials />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
}
