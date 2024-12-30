"use server";

import integrationOperations from "@/graphql/operations/integrations";
import { useMutation } from "@apollo/client";

export default function onInstagramCallbackAction() {
  const [integrateWithInstagram, { data, loading, error }] = useMutation(
    integrationOperations.Mutations.integrateWithInstagram
  );
}
