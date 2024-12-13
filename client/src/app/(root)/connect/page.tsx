import {
  IconBrandFacebookFilled,
  IconBrandInstagram,
  IconBrandTiktokFilled,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { SocialCard } from "./_components/social-card";

export default function Page() {
  return (
    <div className="p-4 md:py-10">
      <div className="py-5 mx-auto max-w-6xl">
        <p>Connect Social Accounts</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mx-auto max-w-6xl">
        {socialMediaPlatforms.map((social) => (
          <SocialCard
            key={social.id}
            Icon={social.icon}
            platform={social.platform}
            description={social.description}
          />
        ))}
      </div>
    </div>
  );
}

const socialMediaPlatforms = [
  {
    id: "twitter",
    platform: "Twitter",
    icon: IconBrandTwitter,
    description:
      " Connect to your Twitter account to automate replies, schedule posts, and grow community.",
    action: () => console.log("Twitter Connect Clicked"),
  },
  {
    id: "instagram",
    platform: "Instagram",
    icon: IconBrandInstagram,
    description:
      "Connect to your Instagram account to automate DMs, schedule posts, and boost engagement.",
    action: () => console.log("Instagram Connect Clicked"),
  },
  {
    id: "facebook",
    platform: "Facebook",
    icon: IconBrandFacebookFilled,
    description:
      "Connect to your Facebook account to manage chats, automate replies, and build connections.",
    action: () => console.log("Facebook Connect Clicked"),
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    icon: IconBrandLinkedin,
    description:
      "Connect to your LinkedIn account to automate outreach, schedule messages, and grow network.",
    action: () => console.log("LinkedIn Connect Clicked"),
  },
  {
    id: "whatsapp",
    platform: "WhatsApp",
    icon: IconBrandWhatsapp,
    description:
      "Connect to your WhatsApp account to automate chats, send messages, and manage conversations.",
    action: () => console.log("WhatsApp Connect Clicked"),
  },
  {
    id: "tiktok",
    platform: "TikTok",
    icon: IconBrandTiktokFilled,
    description:
      "Connect to your TikTok account to automate replies, schedule posts, and engage followers.",
    action: () => console.log("TikTok Connect Clicked"),
  },
];
