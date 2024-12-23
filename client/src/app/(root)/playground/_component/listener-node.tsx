import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { ListenerField } from "../../automations/[id]/_components/fields/listener";
import { Handle, Position } from "@xyflow/react";

const ListenerNode = () => {
  const { control } = useFormContext(); // Access control from context

  return (
    <div style={{ width: "100%" }} className="">
      <FormField
        control={control}
        name="listener"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ListenerField {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="listener-node-down"
      />
      <Handle type="target" position={Position.Top} id="listener-node-up" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="listener-node-down"
      />
    </div>
  );
};

export default ListenerNode;
