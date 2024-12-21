"use client";

import { Listener } from "../automations/[id]/_components/fields/listener";
import Message from "../automations/[id]/_components/fields/message";
import Prompt from "../automations/[id]/_components/fields/prompt";
import { TriggerField } from "../automations/[id]/_components/fields/trigger-field";

export default function Page() {
  return (
    <div className="p-4 md:py-10 grid grid-cols-3 gap-4">
      <div className="">
        <p className="pb-4">
          STEP1: trigger mutation for type, choose between DM or COMMENT
          (completes trigger)
        </p>
        <TriggerField />
      </div>
      <div className="">
        <p className="pb-4">
          STEP2: USER fills the keyword field and automatically fulfils the
          keyword table (completes keyword)
        </p>
        keyword
      </div>
      <div className="">
        <p className="pb-4">
          STEP3: Listeners table starts to get filled. with the listener(ENUM
          SMART OR MESSAGE) field (listner type incomplete)
        </p>
        <Listener />
      </div>

      <div className="">
        <p className="pb-4">
          STEP4: Prompt(for ai) or custom message is required to know clients
          action (listner prompt/commentReply complete)
        </p>
        <Prompt handleNextStep={() => {}} />
      </div>
      <div className="">
        <p className="pb-4">
          STEP4: this field and the prompt field should be reusable components
        </p>

        <Message handleNextStep={() => {}} />
      </div>
    </div>
  );
}
