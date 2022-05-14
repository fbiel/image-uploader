import { Group, Text, useMantineTheme, MantineTheme, Center, TextInput, Stack } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon, CircleCheck } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useState } from 'react';
import axios from 'axios';
import { showNotification, updateNotification } from '@mantine/notifications';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
      ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }): JSX.Element {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
  <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
    <ImageUploadIcon status={status} style={{ color: getIconColor(status, theme) }} size={80} />

    <div>
      <Text size="lg" inline my="md">
        Drück hier, dann öffnet sich deine Fotomediathek
      </Text>
      <Text size="sm" color="dimmed" inline mt={7}>
        Drag&amp;Drop geht auch!
      </Text>
    </div>
  </Group>
);

export function UploadPage() {
  const theme = useMantineTheme();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Center p="md">
      <Stack p={5}>
        <TextInput placeholder='optional' label='Dein Name'
          value={username} onChange={(event) => setUsername(event.currentTarget.value)} />
        <Dropzone
          onDrop={async (files) => {
            setIsLoading(true)
            showNotification({
              id: 'load-data',
              loading: true,
              title: 'Upload',
              message: 'Deine Bilder werden hochgeladen',
              autoClose: false,
              disallowClose: true,
            });
            console.log('accepted files', files)
            try {
              const formData = new FormData()
              formData.append('uploader', username)
              files.forEach(f => formData.append("images", f))
              axios({
                method: "POST",
                url: `http://${process.env.REACT_APP_SERVER}:${process.env.REACT_APP_SERVER_PORT}/upload`,
                data: formData,
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              })
            } catch (error) {
              console.error('error uploading files', error)
            } finally {
              setIsLoading(false)
              updateNotification({
                id: 'load-data',
                color: 'teal',
                title: 'Upload vollständig',
                message: files.length === 1 ? "Dein Bild wurde hochgeladen!" : (files.length + " Bilder wurden hochgeladen!"),
                icon: <CircleCheck />,
                autoClose: 5000,
              });
            }

          }}
          loading={isLoading}
          onReject={() => setIsLoading(false)}
          maxSize={20 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          radius={10}
        >
          {(status) => dropzoneChildren(status, theme)}
        </Dropzone>
      </Stack>
    </Center>
  );
}