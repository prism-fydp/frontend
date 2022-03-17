import { gql, useQuery } from '@apollo/client';
import { FileMetadata } from '../../types';
import { sanitizeFileMetadata } from '../../utils/sanitize';

const GET_ORDERED_ESSAYS = gql`
  query get_ordered_essays($order: order_by!) {
    essay(order_by: { created_at: $order }) {
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

export default function useOrderedEssays(
  order: string,
  onCompleted: (essays: Array<FileMetadata>) => void,
  skip: boolean
) {
  const complete = (data: any) =>
    onCompleted(data.essay.map(sanitizeFileMetadata));
  useQuery(GET_ORDERED_ESSAYS, {
    skip,
    onCompleted: complete,
    onError: console.log,
    variables: { order },
  });
}
