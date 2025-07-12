import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '@/App';
import Website from '@/website';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from './theme';

export default function AppRoutes() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="dark" />
      <MantineProvider theme={theme} forceColorScheme="dark">
      
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/site" element={<Website />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}
