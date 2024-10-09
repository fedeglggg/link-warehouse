import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  ComboboxLikeRenderOptionInput,
  ComboboxStringItem,
  Group,
  Text,
} from "@mantine/core";

export const renderAutocompleteOption = (
  { option }: ComboboxLikeRenderOptionInput<ComboboxStringItem>,
  links: any
) => {
  console.log("option", option);
  const splitted = option.value.split(" - ");

  return (
    <Group gap="sm">
      <div>
        <Text size="sm">{splitted[1] || ""}</Text>
        <Text size="xs">{splitted[2] || ""}</Text>
      </div>
    </Group>
  );
};
