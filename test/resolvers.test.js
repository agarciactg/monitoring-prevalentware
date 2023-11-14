import { gql } from "apollo-server";

beforeAll(async () => {
  // Inicialización antes de que comiencen las pruebas
  console.log("###### Connect at DB 🚀🚀🚀🚀🚀 ######");
});

test("allUsers throws ForbiddenError for non-admin role", async () => {
  const { data, errors } = await query({
    query: gql`
      query allUsers {
        allUsers {
          id
          email
          name
          createdAt
        }
      }
    `,
    headers: {
      authorization:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQcmV2YWxlbnR3YXJlIiwiaWF0IjoxNjkyOTEwNDcwLCJleHAiOjE3MjQ0NDY0NzAsImF1ZCI6Ind3dy5wcmV2YWxlbnR3YXJlLmNvbSIsInN1YiI6ImpvaG4uamFja3NvbkB0ZXN0LmNvbSIsIkdpdmVuTmFtZSI6IkpvaG4iLCJTdXJuYW1lIjoiSmFja3NvbiIsIkVtYWlsIjoiam9obi5qYWNrc29uQHRlc3QuY29tIiwiUm9sZSI6ImNsbHBuMW1mcDAwMDIzODdlZXVkZW9ybmQifQ.wPxeeEmQP1KUnKP_wPgqDtKK7dc-33xvhFe9pmxg14c",
    },
  });

  expect(errors).toBeDefined();
  expect(errors[0].message).toBe(
    "No tiene permisos suficientes para realizar esta acción."
  );
  expect(data).toBeUndefined();
});
