import React from 'react';
import { Grid, Skeleton, Container, Button } from '@mantine/core';
import { ArrowsMaximize } from 'tabler-icons-react';

const child = <Skeleton height={140} radius="md" animate={false} />;

export function GalleryPage() {
  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={8}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={3}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid>
      <Button mt="xl" fullWidth variant='subtle' leftIcon={<ArrowsMaximize />}>Vollbild</Button>
    </Container>
  );
}