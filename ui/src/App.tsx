import React, { useState } from 'react';
import { ColorScheme, ColorSchemeProvider, MantineProvider, Tabs, Text, Title } from '@mantine/core';
import { Photo, Upload } from 'tabler-icons-react';
import { UploadPage } from './pages/UploadPage'
import { GalleryPage } from './pages/GalleryPage'
import './App.css';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const prefferedTheme = userPrefersDark ? 'dark' : 'light'
  const [colorScheme, setColorScheme] = useState<ColorScheme>(prefferedTheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <div className="App">
      <MantineProvider>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <NotificationsProvider>
            <Title order={3} align="center" m="md">Polterabend</Title>
            <Text m="md" align="center">
              Ladet Bilder hoch, die ihr mit Sigrun und Jens teilen möchtet.<br />
              Vorsicht: Könnten auch heute Abend gezeigt werden 😉
            </Text>
            <Tabs position='center'>
              <Tabs.Tab label="Hochladen" icon={<Upload size={14} />}><UploadPage /></Tabs.Tab>
              <Tabs.Tab label="Anschauen" icon={<Photo size={14} />}>
                <GalleryPage />
              </Tabs.Tab>
            </Tabs>
          </NotificationsProvider>
        </ColorSchemeProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
