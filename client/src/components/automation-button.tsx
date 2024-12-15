import { useMutation, useQuery } from "@apollo/client";
import { Button } from "./ui/button";
import automationOperations, {
  ListUserAutomations,
} from "@/graphql/operations/automations";
import { auth } from "@/auth";
import userOperations, { GetLoggedInUser } from "@/graphql/operations/user";

export default function AutomationButton({
  children,
  className,
  variant,
}: {
  children: React.ReactNode;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}) {
  const { data } = useQuery<GetLoggedInUser>(
    userOperations.Querries.createPost
  );

  const userId = data?.getLoggedInUser.user.id;

  const [createAutomation] = useMutation(
    automationOperations.Mutations.CreateAutomation,
    {
      update(cache, { data: { createAutomation } }) {
        const existingAutomations = cache.readQuery<ListUserAutomations>({
          query: automationOperations.Queries.ListUserAutomations,
        });

        if (existingAutomations?.listAutomations) {
          cache.writeQuery({
            query: automationOperations.Queries.ListUserAutomations,
            data: {
              listAutomations: [
                ...existingAutomations.listAutomations,
                createAutomation,
              ],
            },
          });
        }
      },
      optimisticResponse: {
        createAutomation: {
          id: crypto.randomUUID(),
          name: "untitled",
          keywords: null,
          listeners: null,
          createdAt: new Date().toISOString(),
          __typename: "Automation",
        },
      },
    }
  );

  const handleCreate = async () => {
    await createAutomation({ variables: { userId } });
  };

  return (
    <Button variant={variant} className={className} onClick={handleCreate}>
      {" "}
      {children}{" "}
    </Button>
  );
}
