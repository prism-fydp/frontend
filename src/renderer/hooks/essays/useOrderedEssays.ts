import query from '../utils/query';

export default function queryOrderedEssays(
  order: string,
  onComplete: (essays: any) => void
) {
  const GET_ORDERED_ESSAYS = `
    query AllBy {
      essay(order_by:
        { ${order} }
      ) {
        cid
        title
        created_at
        user {
          username
        }
      }
    }
  `;

  return query({
    query: GET_ORDERED_ESSAYS,
    variables: {},
    operationName: 'AllBy',
  })
    .then(({ data, errors }) => (errors ? Promise.reject(errors) : data.essay))
    .then(onComplete)
    .catch(console.error);
}
