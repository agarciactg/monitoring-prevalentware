// resolvers.test.js
import { gql } from 'apollo-server';
import { query } from '../setupTests';

describe('allUsers resolver', () => {
  test('throws ForbiddenError for non-admin role', async () => {
    // Simular un usuario con un rol que no es admin
    const nonAdminToken =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcmV2YWxlbnR3YXJlIiwiaWF0IjoxNjkyOTEwNDcwLCJleHAiOjE3MjQ0NDY0NzAsImF1ZCI6Ind3dy5wcmV2YWxlbnR3YXJlLmNvbSIsInN1YiI6ImpvaG4uamFja3NvbkB0ZXN0LmNvbSIsIkdpdmVuTmFtZSI6IkpvaG4iLCJTdXJuYW1lIjoiSmFja3NvbiIsIkVtYWlsIjoiam9obi5qYWNrc29uQHRlc3QuY29tIiwiUm9sZSI6ImNsbHBuMW1mcDAwMDIzODdlZXVkZW9ybmQifQ.wPxeeEmQP1KUnKP_wPgqDtKK7dc-33xvhFe9pmxg14c';

    const { errors, data } = await query({
      query: gql`
        query {
          allUsers {
            id
            email
            name
            createdAt
          }
        }
      `,
      headers: {
        authorization: nonAdminToken,
      },
    });

    // Verificar que se lanzó un ForbiddenError
    expect(errors).toBeDefined();
    expect(errors[0].message).toBe('No tiene permisos suficientes para realizar esta acción.');

    // Verificar que no hay datos devueltos
    expect(data).toBeUndefined();
  });
});
