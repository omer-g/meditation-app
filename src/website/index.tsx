import { Container, Stack, Title, Text, Anchor, List, Image, Center } from '@mantine/core';
import { AccentList } from '@/website/components/AccentedList';

export default function Website() {
  return (
    <Container size="sm" px="md" pt="xl">
      <Stack gap="md">
        <Title order={1} ta="center">
          Meditation Gong
        </Title>        
        <Center>
          <Anchor
            href="https://meditation-gong.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-block', lineHeight: 0 }}
          >
            <Image
              src="./images/cyancircle.svg"
              h={100} // Match to text size
              w={100}
              fit="contain"
              alt="Gong"
              style={{ verticalAlign: 'middle' }}
            />
          </Anchor>
        </Center>
        {/* <Space m="xs" /> */}
        <Text>
          An <Anchor href='https://meditation-gong.onrender.com/' target='_blank' rel="noopener noreferrer">app</Anchor> that plays a gong sound
          at the beginning and end of a chosen time interval. Intended primarily for seated or walking
          meditation.
        </Text>
        <Text>
          The app is also available as a <Anchor href='https://github.com/omer-g/meditation-app/releases/latest'>phone app</Anchor> for Android. This version is
          fully offline and can be used when internet is unavailable or in airplane mode.
        </Text>
        <Title order={5}>Usage</Title>
        <AccentList>
          <List.Item>Select a duration (5, 10, 20, or 30 minutes)</List.Item>
          <List.Item>Press the round button to start</List.Item>
        </AccentList>
        <Title order={5}>Notes</Title>
        <AccentList>
          <List.Item>Pressing the round button again stops the timer</List.Item>
          <List.Item>
            Clicking outside the round button toggles a progress bar
          </List.Item>
          <List.Item>
            Playing music on phone during a session will stop the timer
          </List.Item>     
        </AccentList>
        <Title order={5}>Code</Title>
        <AccentList>
          <List.Item>The source code is available on <Anchor href="https://github.com/omer-g/meditation-app">Github</Anchor> under MIT license</List.Item>
        </AccentList>
      </Stack>
    </Container>
  );
}
