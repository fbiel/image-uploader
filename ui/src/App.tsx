import React from 'react';
import { Tabs, Text, Title } from '@mantine/core';
import { Photo, Upload } from 'tabler-icons-react';
import { UploadPage } from './pages/UploadPage'
import { GalleryPage } from './pages/GalleryPage'
import './App.css';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
