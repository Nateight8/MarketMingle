// import { FormControl, FormField, FormItem } from "@/components/ui/form";
// import { AutomationFormSchema as FormSchema } from "@/lib/utils";
// import { UseFormReturn } from "react-hook-form";
// import { z } from "zod";
// import { Trigger } from "./trigger";
// import { useEffect, useState } from "react";
// import Keyword from "./keywords";
// import { Listener } from "./listener";
// import Message from "./message";
// import Prompt from "./prompt";
// import automationOperations from "@/graphql/operations/automations";
// import { useQuery } from "@apollo/client";

// const getFieldNamesForStep = (
//   step: number
// ): (keyof z.infer<typeof FormSchema>)[] => {
//   switch (step) {
//     case 1:
//       return ["trigger"];
//     case 2:
//       return ["keyword"];
//     case 3:
//       return ["listener"];
//     default:
//       return [];
//   }
// };

// export default function FormFields({
//   form,
//   getAutomation,
// }: {
//   form: UseFormReturn<z.infer<typeof FormSchema>>;
//   getAutomation: GetAutomation;
// }) {
//   const [step, setStep] = useState(1);

//   const switchField = form.watch("listener");

//   const handleNextStep = async () => {
//     const fields = getFieldNamesForStep(step);
//     const isValid = await form.trigger(fields);

//     if (isValid) {
//       setStep((prev) => Math.min(prev + 1, 4)); // Ensure step doesn't exceed 4
//     }
//   };

//   // Watch for changes on Step 1 and Step 3 fields
//   useEffect(() => {
//     if (step === 1 && form.watch("trigger")) {
//       handleNextStep(); // Move to the next step on valid change
//     }
//     if (step === 3 && form.watch("listener")) {
//       handleNextStep(); // Same for Step 3
//     }
//   }, [form.watch("trigger"), form.watch("listener")]); // Dependency array ensures it runs when values change

//   return (
//     <>
//       {step >= 1 && (
//         <FormField
//           control={form.control}
//           name="trigger"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Trigger {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       )}
//       {step >= 2 && (
//         <FormField
//           control={form.control}
//           name="keyword"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Keyword handleNextStep={handleNextStep} {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       )}

//       {step >= 3 && (
//         <FormField
//           control={form.control}
//           name="listener"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Listener {...field} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       )}

//       {switchField === "MESSAGE" ? (
//         <FormField
//           control={form.control}
//           name="message"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Message {...field} handleNextStep={handleNextStep} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       ) : switchField === "SMARTAI" ? (
//         <FormField
//           control={form.control}
//           name="prompt"
//           render={({ field }) => (
//             <FormItem>
//               <FormControl>
//                 <Prompt {...field} handleNextStep={handleNextStep} />
//               </FormControl>
//             </FormItem>
//           )}
//         />
//       ) : null}
//     </>
//   );
// }
