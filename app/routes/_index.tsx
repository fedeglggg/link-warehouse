import type { MetaFunction } from "@remix-run/node";
import { AppShell, Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ActionToggle } from "~/ActionToggle";

/* import { ListLink } from "~/components/ListLink"; */
import ListLink from "~/components/ListLink";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}>
      <AppShell.Header>
        {" "}
        <ActionToggle />
      </AppShell.Header>
      <AppShell.Navbar>Navbar</AppShell.Navbar>
      <AppShell.Main>
        <Flex
          mih={50}
          bg="rgba(0, 0, 0, .3)"
          gap="md"
          justify="flex-start"
          align="flex-start"
          direction="row"
          wrap="wrap">
          <ListLink />
        </Flex>

        {/* <Button onClick={toggleDesktop} visibleFrom="sm">
          Toggle navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          Toggle navbar
        </Button> */}
      </AppShell.Main>
    </AppShell>
  );
}
