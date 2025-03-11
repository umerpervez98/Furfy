import ThankYou from "@/components/thank-you/thank-you";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Furfy | Thank You',
  description: 'Furfy Thank You',
}

export default function ThankYouPage() {
  return <ThankYou />;
}
