import { AutocompleteProps, Group, Text } from "@mantine/core";

export const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
  option,
}) => {
  const splitted = option.value.split(" - ");
  const label = splitted[1] || "";
  const detail = splitted[2] || "";

  return (
    <Group gap="sm">
      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs">{detail}</Text>
      </div>
    </Group>
  );
};
