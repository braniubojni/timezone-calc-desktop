export enum SortOption {
  ALPHABET = 1,
  LAST_CREATED,
  OFFSET,
}

export const sortOpts = [
  { label: 'Alphabet', value: SortOption.ALPHABET },
  { label: 'Last Created', value: SortOption.LAST_CREATED },
  { label: 'Offset', value: SortOption.OFFSET },
];
