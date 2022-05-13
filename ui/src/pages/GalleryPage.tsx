import React, { useEffect, useState } from 'react';
import { Grid, Skeleton, Center, Button, createStyles, Image, Stack } from '@mantine/core';
import { ArrowsMaximize } from 'tabler-icons-react';
import { useFullscreen, useInterval } from '@mantine/hooks';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  stack: {
    maxWidth: 1024,
    padding: 25
  },
  image: {
    minWidth: '80%'
  }
}));

export function GalleryPage() {
  const [src, setSrc] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)
  const { classes } = useStyles();
  const { ref, toggle, fullscreen } = useFullscreen();

  const interval = useInterval(() => {
    axios.get(`http://${process.env.REACT_APP_SERVER}:3333/random`).then(res => {
      console.log('response', res)
      setSrc((current) => { setPrevious(current); return res.data; })
    }).catch((e) => console.error(e))
  }, 10000);

  useEffect(() => {

    axios.get(`http://${process.env.REACT_APP_SERVER}:3333/random`).then(res => {
      setSrc(res.data)
      setPrevious(res.data)
    }).catch((e) => console.error(e))

    interval.start();
    return interval.stop;
  }, []);

  return (
    <Center>
      <Stack className={classes.stack} justify="center" align="center">
        {src ? (
          <Image ref={ref} alt="" className={classes.image} src={src} />
        ) : (<Skeleton height={140} radius="md" animate />)}
        <Button onClick={toggle} mt="xl" fullWidth variant='subtle' leftIcon={<ArrowsMaximize />}>Vollbild</Button>
      </Stack>
    </Center>
  );
}