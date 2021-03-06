import { gql, useLazyQuery } from '@apollo/client';
import { FileMetadata } from '../../types';
import { sanitizeFileMetadata } from '../../utils/sanitize';

const SEARCH_ESSAYS = gql`
  query search_essays($text: String!) {
    essay(
      where: {
        _or: [
          { title: { _ilike: $text } }
          { user: { username: { _ilike: $text } } }
        ]
      }
    ) {
      cid
      title
      created_at
      user {
        id
        username
        bio
        public_address
      }
    }
  }
`;

export default function useSearchEssays(
  onCompleted: (essays: Array<FileMetadata>) => void
) {
  const complete = (data: any) =>
    onCompleted(data.essay.map(sanitizeFileMetadata));
  const [searchEssays, queryState] = useLazyQuery(SEARCH_ESSAYS, {
    onCompleted: complete,
  });

  return (text: string) => searchEssays({ variables: { text: `%${text}%` } });
}
